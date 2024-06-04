const mongoose = require('mongoose');
const express = require("express"); 
const  {Tutorial} = require("./../models/tutorial-model")
var tutorialRouter = express.Router(); 
var path = require("path");
var fs = require("fs");


tutorialRouter.post("/tutorial/create", async (req, res) => {

    try {
        const body = req.body;

        // Assuming some form of validation or database operation happens here
        if (!body || Object.keys(body).length === 0) {
            throw new Error("Invalid request body");
        }

        // Simulate a successful operation (e.g., saving to a database)
        const savedTutorial = await Tutorial(body);

        res.status(200).send({
            is_error: false,
            data: savedTutorial, // You can replace this with savedTutorial or any processed data
            message: "Tutorial created successfully"
        });
    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while creating the tutorial"
        });
    }
 
});

  

module.exports = { tutorialRouter }