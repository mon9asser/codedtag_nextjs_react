const mongoose = require('mongoose');
const express = require("express"); 
const  {Categories} = require("./../models/category-model")
const {middlewareTokens} = require("./../apis/secure/middlewares")

var redirectsRouter = express.Router(); 
var path = require("path");
var fs = require("fs");


// redirects for main folder
redirectsRouter.get("/:folder/", (req, res) => {

    console.log('main folder: ' + req.params.folder);

    res.sendFile(path.join(__dirname, './../public/views/build', 'index.html'));
})

// redirects for subfolder
redirectsRouter.get("/:folder/:subfolder/", (req, res) => {

    console.log('subfolder: ' + req.params.folder, req.params.subfolder);

    res.sendFile(path.join(__dirname, './../public/views/build', 'index.html'));
})

module.exports = { redirectsRouter }