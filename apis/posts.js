const mongoose = require('mongoose');
const express = require("express");
const { name, domain } = require("./../config/db");

var postRouter = express.Router();
var path = require("path");
var fs = require("fs");
const {Config} = require("./../config/options");
const {Helper} = require("./../config/helper")
const multer = require('multer');
const {Posts} = require("./../models/posts-model");

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
 

postRouter.post("/post/create-update", async (req, res) => {
    try {
        const body = req.body; 
        
        // Validate the request body
        if (!body || Object.keys(body).length === 0) {
            throw new Error("Invalid request body");
        }

        let savedPost;
        if (body.post_id !== undefined && body.post_id !== "") {
            // Update the existing post data
            savedPost = await Posts.findByIdAndUpdate(body.post_id, body, { new: true });
        } else {
            // Create a new post
            savedPost = await new Posts(body).save();
        }

        if (savedPost) {
            res.status(200).send({
                is_error: false,
                data: savedPost,
                message: "Post saved successfully"
            });
        } else {
            throw new Error("An error occurred, please try later");
        }

    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while creating or updating the post"
        });
    }
});


postRouter.get("/post/get", async (req, res) => {
    try {
        const { post_type } = req.query;
        console.log(post_type);
        // Validate the request query parameter
        if (!post_type) {
            throw new Error("post_type parameter is required");
        }

        // Fetch posts based on the post_type
        const posts = await Posts.find({ post_type: post_type });

        if (posts.length > 0) {
            res.status(200).send({
                is_error: false,
                data: posts,
                message: "Posts retrieved successfully"
            });
        } else {
            res.status(404).send({
                is_error: true,
                data: null,
                message: "No posts found for the given post_type"
            });
        }

    } catch (error) {
        console.log(error.message);
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while retrieving posts"
        });
    }
})

module.exports = { postRouter };
