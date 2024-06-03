const mongoose = require('mongoose');
const express = require("express"); 
const  {Tutorial} = require("./../models/tutorial-model")
var tutorialRouter = express.Router(); 
var path = require("path");
var fs = require("fs");


tutorialRouter.post("/tutorial/create", async (req, res) => {
    res.send("tutorials")
});

  

module.exports = { tutorialRouter }