const mongoose = require('mongoose');
const express = require("express");
const settingsRouter = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const {Config} = require("./../config/options");
const { Sets } = require("./../models/settings-model");
const { media_url } = require("./../config/db")
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
settingsRouter.post("/upload-logo", upload.single('file'), (req, res) => {
      
    if (!req.file) {
        return res.status(400).send({ success: false, message: "No file uploaded" });
    }
    
    res.send({ success: true, message: "File uploaded successfully", filePath: `${media_url}/${req.file_name}` });
});

settingsRouter.post("/settings/update", async (req, res) => {
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
});

module.exports = { settingsRouter }
