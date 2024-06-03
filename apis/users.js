const mongoose = require('mongoose');
const express = require("express");
var userRouters = express.Router();
var sanitizer = require('sanitizer');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


const {Helper} = require("./../config/helper")
const { domain } = require("./../config/db");

// Models of DB
const {Usr} = require("./../models/user-model");

// configuration
const {Config} = require('./../config/options');


// Login 
userRouters.post("/user/login", async (req, res) => {
    try {
        const { password, email_username } = req.body;

        if (!password || !email_username) {
            return res.status(400).send({
                message: "User fields are required!",
                data: [],
                is_error: true
            });
        }

        // Check if the email or username exists in the database
        const user_check = await Usr.findOne({
            $or: [
                { email: email_username },
                { username: email_username }
            ]
        });

        if (!user_check) {
            return res.status(400).send({
                is_error: true,
                data: [],
                message: "Incorrect login details. Please check your username and password and try again."
            });
        }

        // Verify password
        var verify_password = await bcrypt.compare(password, user_check.password);
        if( ! verify_password ) {
            return res.status(400).send({
                is_error: true,
                data: [],
                message: "Incorrect login details. Please check your username and password and try again."
            });
        }

        // generate token 
        const token = await jwt.sign({ 
            user_data: {
                id: user_check._id,
                name: user_check.firstname,
                email: user_check.email,
                full_name: user_check.full_name, 
                idx: user_check.rule,
                site_name: user_check.domain,
                dashboard: Config.dashboard.url,
                is_user: user_check.rule === 0 
            }
        }, Config.jwt_secret, { expiresIn: '3h' }); 

        // update token directly   
        const user_data = {
            id: user_check._id,
            name: user_check.firstname,
            email: user_check.email,
            full_name: `${user_check.firstname} ${user_check.secondname}`,
            token,
            site_name: user_check.domain,
            thumbnail: Helper.getGravatarUrl(user_check.email),
            dashboard: Config.dashboard.url,
            is_user: user_check.rule === 0
        };

        return res.send({
            data: user_data, 
            is_error: false, 
            message: "You logged in successfully. The system will redirect you to your dashboard shortly!"
        });

    } catch (error) { 
        res.status(500).send({
            is_error: true,
            data: [],
            message: "An error occurred during the login process. Please try again later."
        });
    }
});


// Register
userRouters.post("/user/register", async (req, res) => {
    
    var {
        username, 
        firstname, 
        secondname, 
        full_name, 
        password, 
        email
    } = req.body;
    
    var objx = {
        is_error: true, 
        message: "Something went wrong, please try later!",
        data: []
    }

    // check if email and username is empty and password  
    if( email == undefined || email == "" || password == undefined || password == "" || full_name == undefined || full_name == "" || username == undefined || username == "" ) {
        objx.is_error = true;
        objx.data = [];
        objx.message = "User fields are required such as email, username, password, name";
        return res.send(objx);
    } 

    // validate email address 
    var validate = Helper.validateEmail(email);
    if( !validate ) {
        objx.is_error = true;
        objx.data = [];
        objx.message = "Invalid Email";
        return res.send(objx); 
    }
    
    // check email or username exists in our database 
    var user_check = await Usr.findOne({
        $or: [
            { email: email },
            { username: username }
        ]
    });
     
    if (user_check) {
        if (user_check.username === username) {
            objx.message = "Username already exists";
        } 
        if (user_check.email === email) {
            objx.message = "Email already exists";
        }
    
        // Send response if either exists
        return res.send(objx);
    }

    if( full_name == "" ) {
        full_name = `${firstname} ${secondname}`;
    }
      
    // prepare data 
    var userObject = {
        username, 
        firstname,  
        secondname, 
        full_name, 
        password, 
        email
    };

    // store data 
    userObject.password = await bcrypt.hash(userObject.password, 10);
    
    // check for admin case 
    /* Subscriber:0, Contributer:1, Editor:2, Author:3, Admin:4 */
    if(userObject.email == "moun2030@gmail.com") {
        userObject.rule = 4;
    } else {
        userObject.rule = 0;
    } 
    
    // Save Data
    try {
        var usrx = await Usr.create(userObject);
         
        if( usrx ) {
            

            if( usrx._id ) {

                // generate token 
                var token_object = {
                    id: usrx._id, 
                    idx: usrx.rule,
                    username, 
                    firstname,   
                    full_name,  
                    email, 
                }

                const token = await jwt.sign({ token_object }, Config.jwt_secret, { expiresIn: '3h' });

                var updated = await Usr.updateOne({ _id: usrx._id }, { $set: {
                    token: token
                }});

                if( updated ) {

                    return res.send({
                        data: {
                            id:usrx._id, 
                            name:firstname,  
                            email: email, 
                            full_name: full_name, 
                            thumbnail: Helper.getGravatarUrl(email),
                            token: token, 
                            site_name: domain,
                            dashboard: Config.dashboard.url,
                            is_user: (userObject.rule == 0 )? true: false 
                        }, 
                        is_error: false, 
                        message: "Your account is ready, The system will redirect you to your dashboard shortly!"
                    })
                }

            } 

            
        }
    } catch (error) {
        return res.send({
            data: usrx, 
            is_error: true, 
            message: "Something went wrong!"
        })
    }
});


// Check user permission
userRouters.post("/user/capabilities", async (req, res) => {
    
    if( (req.body.token == undefined || req.body.token == "") && (req.body.page == undefined || req.body.page == "") ) {
        return res.send({
            data: [],
            message: "Permission denied!",
            is_error: true,
            redirect_to: Config.dashboard.login,
        });
    };  
    
    var page = req.body.page;
    var token = req.body.token; 


    // create post without publish -> in review
    // permission of users subscriber:0, Contributer:1, Editor:2, Author:3, Admin:4
    var permissions = [
        {   
            // Can read and comment on posts.
            cap: 0,
            name: 'subscriber',
            rules: []
        },
        {
            // Can write and submit posts for review.
            cap: 1,
            name: 'contributer',
            rules: []
        },
        {
            // Can publish and manage their own posts.
            cap: 2,
            name: 'author',
            rules: []
        },
        {
            // Can publish and manage posts, including others.
            cap: 3,
            name: 'editor',
            rules: [],
        },
        {
            // Has full control over the blog, including managing users.
            cap: 4,
            name: 'admin',
            rules: [
                "settings",
                "users",
                "dashboard",
                "create-post",
                "create-tutorial"
            ]
        }
    ]; 
    

    jwt.verify(token, Config.jwt_secret, (err, decoded) => {
        
        // expired case - JsonWebTokenError - TokenExpiredError
        if (err) {
            
            var errorObject = {
                data: [], 
                is_error: true, 
                expired: false,
                redirect_to: Config.dashboard.login,
                message: ""
            }

            if(err.name != undefined && err.name != "TokenExpiredError" ) {
                errorObject.message = "Your session is expired, please login again"; 
                errorObject.expired = true; 
            } else {
                errorObject.message = "Permission Denied!"; 
                errorObject.expired = false; 
            }


          return res.send(errorObject);
        }   
        
        var rule = ( decoded.user_data != undefined )? decoded.user_data.idx: decoded.token_object.idx; 
         
        var index = permissions.findIndex(x => { 
            return x.cap == rule;
        });
        
        if( index == -1 ) {
            return res.send({
                data: [], 
                is_error: true, 
                expired: false,
                redirect_to: Config.dashboard.login,
                message: "Permission Denied!"
            })
        }
        
        var user_permission = permissions[index];
        var rules = user_permission.rules;
        console.log(rules, page);
        if( rules.includes(page) ) {
            return res.send({
                data: [], 
                is_error: false, 
                expired: false,
                redirect_to: Config.dashboard.login,
                message: "Permission is allowed"
            })
        } else {
            return res.send({
                data: [], 
                is_error: true, 
                expired: false,
                redirect_to: Config.dashboard.login,
                message: "Permission Denied!"
            })
        }

    });
       
    

 

}); 

// Login 

// Subscribe 


module.exports = { userRouters }