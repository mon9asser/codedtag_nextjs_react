const multer = require("multer");
const express = require('express');
const sharp = require('sharp');
const { Media } = require("./../models/media-model");
const { middlewareTokens } = require("./secure/middlewares");
const { Config } = require("./../config/options");
const {Posts} = require("./../models/posts-model");

const { Helper } = require("./../config/helper");
const fs = require('fs');
const path = require('path');
var mediaRouter = express.Router(); 

const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});

mediaRouter.post("/media/upload", middlewareTokens, upload.single("image"), async (req, res) => {
  try {
      if (req.body.id) {
            // Update existing media information without uploading a new file
            const existingMedia = await Media.findById(req.body.id);

            if (!existingMedia) {
                return res.status(404).send({ error: 'Media not found' });
            }
            
            existingMedia.title = req.body.title;
            existingMedia.description = req.body.description;
            if( existingMedia.model_name == 'post') {
                var post = await Posts.findOne({_id: existingMedia.model_id})
                if( post != null ) {
                    var blocks = [...post.blocks].map(x => {
                       if(x.id == existingMedia.block_id ) {
                            x.data.caption = req.body.title
                       }
                       return x;
                    });
                    post.blocks = blocks;
                    post.markModified('blocks');
                    await post.save();
                }
            }


            await existingMedia.save();
            return res.send({
                data: existingMedia,
                is_error: false,
                message: 'Updated successfully!'
            });
      } else {
          // Upload a new image
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
              data: newMedia,
              is_error: false,
              message: 'Uploaded successfully!'
          });
      }
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
  
mediaRouter.delete("/media/:id", middlewareTokens, async (req, res) => {
   
  try {
      const mediaId = req.params.id;
      const media = await Media.findById(mediaId);

      if (!media) {
          return res.status(404).send({ error: 'Media not found' });
      }

      var media_name = media.name;
      if( media.model_name == 'post' ) {
        var media_name = media.url.replace(Config.media_url, "").replace(/\//g, '\\');
      }

      // Delete the image file from the server
      const filePath = path.join(Config.uploads.folder, Config.uploads.serve, media_name);
        
      if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
      }

      // delete block of image from post 
      if( media.model_name == 'post' ) {
        var post = await Posts.findOne({_id: media.model_id})
        if( post != null ) {
            var blocks = [...post.blocks].filter(x => x.id !== media.block_id);
            post.blocks = blocks;
            post.markModified('blocks');
            await post.save();
        }
      }

      // Delete the image record from the database
      await Media.findByIdAndDelete(mediaId);

      return res.send({
          is_error: false,
          message: 'Deleted successfully!'
      });
  } catch (error) {
      return res.send({
          is_error: true,
          message: (error.message || 'Something went wrong')
      });
  }
});
  
 
const updateImageDetails = async ({ id, title, description, name, url, is_model, model_name, model_id, block_id}) => {
    try {
        let response;

        if (id) {

            // Update existing media details
            const existingMedia = await Media.findById(id);

            if (!existingMedia) {
                response = { error: 'Media not found', is_error: true };
                return response;
            }

            existingMedia.title = title;
            existingMedia.description = description;
            existingMedia.name = name;
            existingMedia.url = url;

            if(  is_model != undefined )
            existingMedia.is_model = is_model 
            
            if(  model_name != undefined )
            existingMedia.model_name = model_name 
            
            if(  model_id != undefined )
            existingMedia.model_id = model_id 
            
            if(  block_id != undefined )
            existingMedia.block_id = block_id

            await existingMedia.save();
            response = {
                data: existingMedia,
                is_error: false,
                message: 'Updated successfully!'
            };
        } else {
            // Create new media entry without uploading an image
                var tobesaved = {
                    title,
                    description,
                    name,
                    url
                };

                if(  is_model != undefined )
                    tobesaved.is_model = is_model 
                
                if(  model_name != undefined )
                    tobesaved.model_name = model_name 
                
                if(  model_id != undefined )
                    tobesaved.model_id = model_id 
                
                if(  block_id != undefined )
                    tobesaved.block_id = block_id

            const newMedia = new Media(tobesaved);

            await newMedia.save();
            response = {
                data: newMedia,
                is_error: false,
                message: 'Created successfully!'
            };
        }

        return response;
    } catch (error) {
        return {
            is_error: true,
            message: error.message || 'Something went wrong'
        };
    }
};
   


// Bulk update and insert 
const bulkUpdateInsertMedia = async (mediaArray) => {
    try {
        const bulkOps = mediaArray.map(media => {
            const { id, title, description, name, url, is_model, model_name, model_id, block_id } = media;
            
            // Create an object with fields to be updated/inserted
            const mediaFields = { };
            
            if( title != undefined ) {
                mediaFields.title = title
            }
            if( description != undefined ) {
                mediaFields.description = description
            }
            if( name != undefined ) {
                mediaFields.name = name
            }
            if( url != undefined ) {
                mediaFields.url = url
            }
             

            if (is_model !== undefined) mediaFields.is_model = is_model;
            if (model_name !== undefined) mediaFields.model_name = model_name;
            if (model_id !== undefined) mediaFields.model_id = model_id;
            if (block_id !== undefined) mediaFields.block_id = block_id;

            if (id) {
                // Update existing media
                return {
                    updateOne: {
                        filter: { _id: id },
                        update: { $set: mediaFields }
                    }
                };
            } else {
                // Insert new media
                return {
                    insertOne: {
                        document: mediaFields
                    }
                };
            }
        });

        // Execute bulk operations
        const result = await Media.bulkWrite(bulkOps);

        return {
            data: result,
            is_error: false,
            message: 'Bulk operation completed successfully!'
        };
    } catch (error) {
        return {
            is_error: true,
            message: error.message || 'Something went wrong'
        };
    }
};


  module.exports = {mediaRouter, updateImageDetails, bulkUpdateInsertMedia};