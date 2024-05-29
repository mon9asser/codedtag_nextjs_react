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
    
    var {
        password, 
        email_username 
    } = req.body;

    if( password == undefined || password == "" || email_username == undefined || email_username == "" ) {
        return res.send({
            message: "User fields are required!",
            data: [],
            is_error: true 
        });
    }

    // check email or username exists in our database 
    var user_check = await Usr.findOne({
        $or: [
            { email: email_username },
            { username: email_username }
        ]
    });
      
    if( user_check == null ) {
        return res.send({
            is_error: true, 
            data: [],
            message: "Incorrect login details. Please check your username and password and try again."
        });
    } 
 
    // verify password
    bcrypt.compare(password, user_check.password, async (err, result) => {
        if (err) {
            return res.send({
                is_error: true, 
                data: [],
                message: "Incorrect login details. Please check your username and password and try again."
            }); 
        }
      
        if (result) {

            var user_data = {
                id:user_check._id, 
                name:user_check.firstname,  
                email: user_check.email, 
                full_name: user_check.full_name, 
                token: user_check.token, 
                idx: user_check.rule,
                site_name: user_check.domain,
                dashboard: Config.dashboard.url,
                is_user: (user_check.rule == 0 )? true: false 
            }

            const token = await jwt.sign({ user_data }, Config.jwt_screret, { expiresIn: '3h' });

            var updated = await Usr.updateOne({ _id: user_check._id }, { $set: {
                token: token
            }});

            if( updated ) {
                return res.send({
                    data: {
                        id:user_check._id, 
                        name: user_check.firstname,  
                        email: user_check.email, 
                        full_name: user_check.full_name, 
                        token: user_check.token, 
                        site_name: domain,
                        dashboard: Config.dashboard.url,
                        is_user: (user_check.rule == 0 )? true: false 
                    }, 
                    is_error: false, 
                    message: "You logged in successfully, The system will redirect you to your dashboard shortly!"
                })
            } 
          // Proceed with login
        } else {
            return res.send({
                is_error: true, 
                data: [],
                message: "Incorrect login details. Please check your username and password and try again."
            });
          // Handle incorrect password
        }
    }); 

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

                const token = await jwt.sign({ token_object }, Config.jwt_screret, { expiresIn: '3h' });

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
            rules: []
        },
        {
            // Has full control over the blog, including managing users.
            cap: 4,
            name: 'admin',
            rules: [
                "settings",
                "users",
                "dashboard"
            ]
        }
    ]; 
    

    jwt.verify(token, Config.jwt_screret, (err, decoded) => {
        
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
        
        var rule = ( decoded.user_data != undefined )? decoded.user_data.idx: 0; 
        
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