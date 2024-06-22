const mongoose = require('mongoose');
const express = require("express"); 
const  {Tutorial} = require("./../models/tutorial-model")
var tutorialRouter = express.Router(); 
var path = require("path");
var fs = require("fs");


tutorialRouter.post("/tutorial/create-update", async (req, res) => {
    try {
        const body = req.body;

        // Assuming some form of validation or database operation happens here
        if (!body || Object.keys(body).length === 0) {
            throw new Error("Invalid request body");
        }

        // Check for the uniqueness of slug and keyphrase
        if (body.slug) {
            const existingSlug = await Tutorial.findOne({ slug: body.slug });
            if (existingSlug && (!body.tutorial_id || existingSlug._id.toString() !== body.tutorial_id)) {
                throw new Error("The slug must be unique. This slug is already in use.");
            }
        }

        if (body.keyphrase) {
            const existingKeyphrase = await Tutorial.findOne({ keyphrase: body.keyphrase });
            if (existingKeyphrase && (!body.tutorial_id || existingKeyphrase._id.toString() !== body.tutorial_id)) {
                throw new Error("The keyphrase must be unique. This keyphrase is already in use.");
            }
        }

        let savedTutorial;
        if (body.tutorial_id !== undefined && body.tutorial_id !== "") {
            // Update the existing tutorial data
            savedTutorial = await Tutorial.findByIdAndUpdate(body.tutorial_id, body, { new: true });
        } else {
            // Simulate a successful operation (e.g., saving to a database)
            savedTutorial = await new Tutorial(body).save();
        }

        if (savedTutorial) {
            res.status(200).send({
                is_error: false,
                data: savedTutorial,
                message: "Tutorial saved successfully"
            });
        } else {
            throw new Error("An error occurred, please try later");
        }

    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while creating the tutorial"
        });
    }
});



/**
 * Example:-
 * localhost:5000/api/tutorials => for all 
 * localhost:5000/api/tutorials?tutorial_id=665f7ac49d84a1b651c0fae2 => for spesific id
 */
tutorialRouter.get("/tutorials", async (req, res) => {
    try {
        const { tutorial_id } = req.query;

        if (tutorial_id) {
            // Fetch the specific tutorial by ID
            const tutorial = await Tutorial.findById(tutorial_id);
            if (tutorial) {
                res.status(200).send({
                    is_error: false,
                    data: tutorial,
                    message: "Tutorial fetched successfully"
                });
            } else {
                throw new Error("Tutorial not found");
            }
        } else {
            // Fetch all tutorials
            const tutorials = await Tutorial.find({});
            res.status(200).send({
                is_error: false,
                data: tutorials,
                message: "All tutorials fetched successfully"
            });
        }
    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while fetching tutorials"
        });
    }
});


tutorialRouter.post("/tutorial/delete", async (req, res) => {
    try {
        const { tutorial_id } = req.body;
         
        if (!tutorial_id) {
            throw new Error("Tutorial ID is required");
        }

        const deletedTutorial = await Tutorial.findByIdAndDelete(tutorial_id);

        if (deletedTutorial) {
            res.status(200).send({
                is_error: false,
                data: deletedTutorial,
                message: "Tutorial deleted successfully"
            });
        } else {
            throw new Error("Tutorial not found or already deleted");
        }

    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while deleting the tutorial"
        });
    }
});

 
module.exports = { tutorialRouter }