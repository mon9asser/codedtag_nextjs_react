const multer = require("multer");
const express = require('express');
const sharp = require('sharp');
const { Media } = require("./../models/media-model");
const { middlewareTokens } = require("./secure/middlewares");
const { Config } = require("./../config/options");
const { Helper } = require("./../config/helper");
var mediaRouter = express.Router();

const storage = multer.memoryStorage(); // Use memory storage to process the file in memory

const upload = multer({ storage: storage });

mediaRouter.post("/media/upload", middlewareTokens, upload.single("image"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send({ error: 'No file uploaded' });
        }

        var image_name = req.body.name.toLowerCase().replace(/\s+/g, "-");

        const filename = `${image_name}.webp`;
        const outputPath = `${Config.uploads.folder}/${Config.uploads.serve}/${filename}`;
        
        
        await sharp(req.file.buffer)
            .resize(800)  
            .toFormat('webp')
            .toFile(outputPath);

        const newMedia = new Media({
            title: req.body.title,
            description: req.body.description,
            name: filename,
            url: `${Config.media_url}/${filename}`,
        });

        await newMedia.save();
        return res.send({
          data: newMedia, is_error: false, message: 'Fetched succssfully!'
        });

    } catch (error) { 
        return res.send({
          is_error: true,
          data: [], 
          message: (error.message || 'Something went wrong')
        });
    }
});
  
mediaRouter.get("/media/all", middlewareTokens, async (req, res) => {
    try {

      const media = await Media.find();
      
      return res.send({
        data: media, is_error: false, message: 'Fetched succssfully!'
      })

    } catch (error) {
      return res.send({
        data: [], is_error: true, message: error.message || 'Something went wrong'
      });
    }
  });
  
  mediaRouter.post("/media/:id", middlewareTokens, async (req, res) => {
    try {
      const media = await Media.findByIdAndDelete(req.params.id);
      if (!media) {
        return res.status(404).send();
      }
      res.status(200).send(media);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  mediaRouter.post("/media/:id", middlewareTokens, async (req, res) => {
    try {
      const media = await Media.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!media) {
        return res.status(404).send();
      }
      res.status(200).send(media);
    } catch (error) {
      res.status(400).send(error);
    }
  });
   

  module.exports = {mediaRouter};