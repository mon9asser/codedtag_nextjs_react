//chapters/bulk_insert_update


const mongoose = require('mongoose');
const express = require("express"); 
const  {Chapters} = require("./../models/chapter-model")
var chapterRouter = express.Router(); 
var path = require("path");
var fs = require("fs");


chapterRouter.post("/chapters/bulk_insert_update", async (req, res) => {
    
    try {
        const dataArray = req.body.data_array;

        if (!dataArray || !Array.isArray(dataArray)) {
            throw new Error("Invalid request body");
        }

        // Delete all existing documents in the collection
        await Chapters.deleteMany({});

        // Prepare bulk operations for inserting new documents
        const bulkOps = dataArray.map(item => ({
            insertOne: {
                document: item
            }
        }));

        const result = await Chapters.bulkWrite(bulkOps);

        res.status(200).send({
            is_error: false,
            data: result,
            message: "Bulk operation completed successfully"
        });

    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred during the bulk operation"
        });
    }
});



chapterRouter.get('/chapters', async (req, res) => {
    try {
        const chapters = await Chapters.find({});
        
        res.status(200).send({
            is_error: false,
            data: chapters,
            message: "Chapters retrieved successfully"
        });
    } catch (error) {
        res.status(500).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while retrieving chapters"
        });
    }
});


module.exports = { chapterRouter }

