const mongoose = require('mongoose');
const express = require("express");
const { name, domain } = require("./../config/db");

var postRouter = express.Router();
var path = require("path");
var fs = require("fs");
const {Config} = require("./../config/options")
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

        const uploadPath = path.join(Config.image_dir, year, month, day);
        ensureDirectoryExistence(uploadPath);

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        var randomizer = Math.floor(1000 + Math.random() * 9000);
        cb(null, `${randomizer}-${file.originalname}`);
    }
});

// Initialize multer with storage engine
const upload = multer({ storage: storage });

postRouter.post("/upload-image", upload.single('image'), (req, res) => {
    
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const fileUrl = path.join(`/${Config.image_dir}`, req.file.filename);
    
    res.json({ success: true, fileUrl: fileUrl });

});

postRouter.get("/get-image", (req, res) => {
    
    const imageUrl = req.body.url;
    
    if (!imageUrl) {
        return res.status(400).json({ success: false, message: 'No URL provided' });
    }

    const imagePath = path.join(__dirname, "..", imageUrl);
    
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            return res.status(404).json({ success: false, message: 'Image not found' });
        }

        res.sendFile(imagePath);
    }); 

});

module.exports = { postRouter };
