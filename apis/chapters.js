//chapters/bulk_insert_update

const {middlewareTokens} = require("./secure/middlewares")

const mongoose = require('mongoose');
const express = require("express"); 
const  {Chapters} = require("./../models/chapter-model")
const {Tutorial}= require("./../models/tutorial-model");

var chapterRouter = express.Router(); 
var path = require("path");
var fs = require("fs");


chapterRouter.post("/chapters/bulk_insert_update", middlewareTokens, async (req, res) => {
    
    try {


         
        
        const dataArray = req.body.data_array;
        const chapter_status = req.body.chapter_status;

        if (!dataArray || !Array.isArray(dataArray) || !chapter_status || !Array.isArray(chapter_status)) {
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


        const updateOps = chapter_status.map(item => ({
            updateOne: {
                filter: { _id: item._id },
                update: { 'options.publish_chapters': item.publish_chapters }
            }
        }));

        const updateResult = await Tutorial.bulkWrite(updateOps);

        res.status(200).send({
            is_error: false,
            data: {result, updateResult},
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



chapterRouter.get('/chapters', middlewareTokens, async (req, res) => {
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

