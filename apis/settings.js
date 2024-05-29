const mongoose = require('mongoose');
const express = require("express"); 
var settingsRouter = express.Router(); 
var path = require("path");
var fs = require("fs");
 
const {Sets} = require("./../models/settings-model");
 
settingsRouter.post("/settings/update", (req, res) => {  
 

}) 

settingsRouter.get("/settings/get", async (req, res) => {  
    
    try {

        var get = await Sets.find({});

        return res.send({
            data: get, 
            is_error: false, 
            message: "success"
        });

    } catch (error) {
        return res.send({
            data: [], 
            is_error: true, 
            message: "Something went wrong"
        });
    }

})


module.exports = { settingsRouter }