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

        const bulkOps = await Promise.all(dataArray.map(async item => {
            if (item._id) {
                const exists = await Chapters.findById(item._id);
                if (exists) {
                    // Update existing document
                    return {
                        updateOne: {
                            filter: { _id: item._id },
                            update: { $set: item }
                        }
                    };
                } else {
                    // Insert new document if _id is generated client-side and does not exist in DB
                    return {
                        insertOne: {
                            document: item
                        }
                    };
                }
            } else if (item.delete) {
                // Delete document
                return {
                    deleteOne: {
                        filter: { _id: item.delete }
                    }
                };
            } else {
                // Insert new document
                return {
                    insertOne: {
                        document: item
                    }
                };
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

