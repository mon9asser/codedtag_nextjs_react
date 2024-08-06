
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
        var build_folder = `${Config.uploads.folder}/${Config.uploads.serve}`;
        const uploadPath = path.join(build_folder, year, month, day);
        ensureDirectoryExistence(uploadPath);

        req.upload_date = `${year}/${month}/${day}`;

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        var file_name = Helper.removeLastExtension(file.originalname);
        var extension = Helper.getLastExtension(file.originalname);

        var randomizer = Math.floor(1000 + Math.random() * 9000);
        req.rand = randomizer;
        req.main_name = file_name;
        var new_file_name = `${file_name}-${randomizer}${extension}`;
        cb(null, new_file_name);
    }
});

// Initialize multer with storage engine
const upload = multer({ storage: storage });

postRouter.post("/upload-image", upload.single('image'), async (req, res) => {
    
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    var upload_dir = `${Config.uploads.serve}/`;
    
    // Define paths
    const filePath = req.file.path;
    const outputDir = path.join(path.dirname(filePath));
    ensureDirectoryExistence(outputDir);
    const outputFilePath = path.join(outputDir, `${req.main_name}-${req.rand}.webp`);

    try {
        // Get the metadata of the image
        const metadata = await sharp(filePath).metadata();

        let resizeWidth = metadata.width;

        // Set max width to 800px if the original width is greater than 800px
        if (metadata.width > 800) {
            resizeWidth = 800;
        }

        // Resize and convert image to WebP
        await sharp(filePath)
            .resize(resizeWidth) // Resize to the calculated width
            .toFormat('webp', { quality: 80 })
            .toFile(outputFilePath);
          

        var fileUrl = `${Config.site_url}/${upload_dir}${req.upload_date}/${path.basename(outputFilePath)}`;
         
        res.json({ success: 1, file: { url: fileUrl, width: resizeWidth } });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image.');
    }
});