const mongoose = require('mongoose');
const express = require("express");
const settingsRouter = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const {Config} = require("./../config/options");
const { Sets } = require("./../models/settings-model"); 
const {AdCampaign} = require("./../models/ad_campaign-model")
const {middlewareTokens} = require("./secure/middlewares")

/*
 var build_folder = `${Config.uploads.folder}/${Config.uploads.serve}`
        const uploadPath = path.join(build_folder, year, month, day);
        ensureDirectoryExistence(uploadPath);
        
        req.upload_date = `${year}/${month}/${day}`;

        cb(null, uploadPath);
*/

// Function to ensure directory exists
const ensureDirectoryExistence = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};


// Set up storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        const build_folder = `${Config.uploads.folder}/${Config.uploads.serve}`;
        ensureDirectoryExistence(build_folder);
        cb(null, build_folder);

    },
    filename: (req, file, cb) => {

        req.file_name = 'site-logo' + '-' + Date.now() + path.extname(file.originalname)
        cb(null, req.file_name );
    }
});

// Initialize upload variable
const upload = multer({ storage: storage });

// File upload endpoint
settingsRouter.post("/upload-logo", [middlewareTokens, upload.single('file')], (req, res) => {
      
    if (!req.file) {
        return res.status(400).send({ success: false, message: "No file uploaded" });
    }
    
    res.send({ success: true, message: "File uploaded successfully", filePath: `${Config.media_url}/${req.file_name}` });
});

settingsRouter.post("/settings/update", middlewareTokens, async (req, res) => {
    var { basic_id, ...objx } = req.body;

    var finder = await Sets.find({});
    var response = {};

    // update
    if (finder.length) {
        response.is_error = false;
        response.message = "Saved Success!";
        response.data = await Sets.updateOne({ _id: finder[0]._id }, objx)
        return res.send(response);
    }

    // insert
    try {
        var document = new Sets(objx);
        await document.save();

        response.is_error = false;
        response.message = "Saved Success!";
        response.data = []

        return res.send(response);
    } catch (error) {
        response.is_error = true;
        response.message = "Something went wrong!";
        response.data = []
        return res.send(response);
    }
});

settingsRouter.get("/settings/get", middlewareTokens, async (req, res) => {
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
});


// access site options and google scripts 
settingsRouter.get("/site_options", middlewareTokens, async (req, res) => {
    
    try {

        var ads = await AdCampaign.find({});
        var settings = await Sets.find({});

        var data = {
            ads,
            settings
        }

        return res.send({
            is_error: false, 
            data: data, 
            message: "Data Fetched Successfully !"
        });

    } catch (error) {
        
        return res.send({
            is_error: true, 
            data: [], 
            message: "Something went wrong!"
        });

    }

})

module.exports = { settingsRouter }
