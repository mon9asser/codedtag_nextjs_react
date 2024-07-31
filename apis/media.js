const multer = require("multer");
const { Media } = require("./../models/media-model");
const { middlewareTokens } = require("./secure/middlewares");
const { Config } = require("./../config/options");
const { Helper } = require("./../config/helper");
var mediaRouter = express.Router();

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
    var build_folder = `${Config.uploads.folder}/${Config.uploads.serve}/`;
      cb(null, build_folder);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });


// Routes with middlewareTokens applied
mediaRouter.post("/media/upload", middlewareTokens, upload.single("file"), async (req, res) => {
    try {
        const newMedia = new Media({
            title: req.body.title,
            name: req.file.filename,
            url: `/uploads/${req.file.filename}`,
        });
        await newMedia.save();
        res.status(201).send(newMedia);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
mediaRouter.get("/media/all", middlewareTokens, async (req, res) => {
    try {
      const media = await Media.find();
      res.status(200).send(media);
    } catch (error) {
      res.status(500).send(error);
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