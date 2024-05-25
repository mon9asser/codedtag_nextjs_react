const mongoose = require('mongoose');
const express = require("express");
var userRouters = express.Router();
var sanitizer = require('sanitizer');
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
 

 const {Helper} = require("./../config/helper")

// Models of DB
const {Usr} = require("./../models/user-model");

// configuration
const {Config} = require('./../config/options');

 


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
    }
    
    
    // Save Data
    try {
        var usrx = await Usr.create(userObject);
        if( usrx ) {

            // Store session    
            var session_data = {
                id: usrx._id,
                email: usrx.email,
                firstname: usrx.firstname,
                secondname: usrx.secondname,
                username: usrx.username,
                type : usrx.rule,
            }

            return res.send({
                data: usrx, 
                is_error: false, 
                message: "Your account is ready, The system will redirect you to your dashboard shortly!"
            })
        }
    } catch (error) {
        return res.send({
            data: usrx, 
            is_error: true, 
            message: "Something went wrong!"
        })
    }
});




module.exports = { userRouters }