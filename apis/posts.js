const mongoose = require('mongoose');
const express = require("express");
const { name, domain } = require("./../config/db");

var postRouter = express.Router();
var path = require("path");
var fs = require("fs");
const {Config} = require("./../config/options");
const {Helper} = require("./../config/helper")
const multer = require('multer');

// Function to ensure directory exists
const ensureDirectoryExistence = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const now = new Date();
        const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        var build_folder = `${Config.uploads.folder}/${Config.uploads.serve}`
        const uploadPath = path.join(build_folder, year, month, day);
        ensureDirectoryExistence(uploadPath);
        
        req.upload_date = `${year}/${month}/${day}`;

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {

        var file_name = Helper.removeLastExtension(file.originalname); 
        var extension = Helper.getLastExtension(file.originalname);
        
        var randomizer = Math.floor(1000 + Math.random() * 9000);
        var new_file_name = `${file_name}-${randomizer}${extension}`;
        cb(null, new_file_name);
    }
});

// Initialize multer with storage engine
const upload = multer({ storage: storage });

postRouter.post("/upload-image", upload.single('image'), (req, res) => {
    
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    var fileUrl = `${Config.uploads.ip}/${Config.uploads.serve}/${req.upload_date}/${req.file.filename}`
     
    res.json({ success: 1, file: {url: fileUrl }  });

});
 

postRouter.post("/post/create", (req, res) => {
    
    res.send(res.send(req.body));

});

module.exports = { postRouter };
