const mongoose = require('mongoose');
const express = require("express"); 
var settingsRouter = express.Router(); 
var path = require("path");
var fs = require("fs");
 
const {Sets} = require("./../models/settings-model");
 
settingsRouter.post("/settings/update", async (req, res) => {  
    
    
    var {basic_id, ...objx} = req.body; 

    var finder = await Sets.find({});
    var response = {};

    // update 
    if( finder.length ) {
        response.is_error = false; 
        response.message = "Saved Success!";
        response.data = await Sets.updateOne({_id: finder[0]._id }, objx )
        return res.send(response);
    }

    // insert 
    var document = new Sets(objx);

    await document.save();

        
    response.is_error = false; 
    response.message = "Saved Success!";
    response.data = []

    return res.send(response);


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