const mongoose = require('mongoose');
const express = require("express");
const {name, domain} = require("./../config/db")
var switcherRouter = express.Router(); 
var path = require("path");
var fs = require("fs");
const {middlewareTokens} = require("./secure/middlewares")

var sites = [
    { 
        db_name: "aaa_codedtag",
        domain: "Codedtag.com",
        name: "CodedTag",
        index: 0,
        property_id: "317812519"
    },
    { 
        db_name: "aaa_codedtag",
        domain: "codedtag.com",
        name: "codedtag",
        index: 1, 
        property_id: "446426355"
    }
];


// switch 
switcherRouter.post("/switcher", middlewareTokens, (req, res) => {

    
    var objx = {
        data: {},
        message: "Something went wrong",
        is_error: true
    };
    
    var index = req.body.index;  
    if( index == undefined ) {
        return res.send(objx);
    }

    var arrayIndex = parseInt(index);
    if(isNaN(arrayIndex)) {
        return res.send(objx)
    }

    if( sites[arrayIndex] == undefined ) {
        return res.send(objx);
    }

    var file_name = path.join(__dirname, "../config/db.js");
    
    var content = `module.exports = ${JSON.stringify(sites[arrayIndex])}`;

    fs.writeFile(file_name, content, (err) => {
        if (err) {
            
            // Log an error message if writing fails
            return res.send(objx);
        } else {

            var dobject = {...sites[arrayIndex]};
            delete dobject.db_name;

            objx.is_error = false;
            objx.data = dobject
            objx.message = `You switched to ${sites[arrayIndex].name} Successfully`;
            // Log a success message if writing succeeds
            return res.send(objx);
        }
    });
    
})


// get current site
switcherRouter.get("/current-site", middlewareTokens, (req, res) => {
    try {

        var index = -1;
        // preparing index 
        sites.forEach(el => {
            var domain_element = el.domain.toLocaleLowerCase(); 
            var current_domain = domain.toLocaleLowerCase();
            if( domain_element == current_domain ) {
                index = el.index;
            }
        })

        return res.send({
            is_error: false, 
            data: {name, domain, index},
            message: ""
        })

    } catch (error) {
        return  res.send({
            is_error: true, 
            data: {},
            message: "Connection error!" 
        })
    }
})

module.exports = { switcherRouter }