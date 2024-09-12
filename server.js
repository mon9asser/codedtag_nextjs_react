const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const fs = require("fs");
const https = require("https"); 

const { Config } = require("./config/options");
const axios = require("axios");

// Importing cron jobs for Google Analytics
require("./apis/anlytics");

const app = express();
app.set('trust proxy', 1);
/*const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
};*/



const corsOptions = {
    origin: [  'https://api.codedtag.com', 'https://admin.codedtag.com', 'https://media.codedtag.com', 'https://codedtag.com' ], // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // This is required for cookies to work with CORS
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", 'https://api.codedtag.com', 'https://admin.codedtag.com', 'https://media.codedtag.com', 'https://codedtag.com'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      styleSrcElem: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:'],
      mediaSrc: ["*"],
      scriptSrc: ["'self'", 'https://www.google.com/recaptcha/', 'https://www.gstatic.com/recaptcha/'],
      frameSrc: ["'self'", 'https://www.google.com/recaptcha/', 'https://www.gstatic.com/recaptcha/'],
      // You can add other directives as needed
    },
  })
);
   
  
// Rate limiting configuration
/*
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // Limit each IP to 300 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(apiLimiter);
*/
// Importing routers
const { tokenRouter } = require("./apis/secure/token");
const { mediaRouter } = require("./apis/media");
const { userRouters } = require("./apis/users");
const { switcherRouter } = require("./apis/switcher");
const { categoryRouter } = require("./apis/category");
const { settingsRouter } = require("./apis/settings");
const { postRouter } = require("./apis/posts");
const { tutorialRouter } = require("./apis/tutorials");
const { chapterRouter } = require("./apis/chapters");
const { menuRouter } = require("./apis/menus");
const { adCampaignRouter } = require("./apis/campaigns");
const { contactRouter } = require("./apis/contact");
const { commentsRouter } = require("./apis/comments");
const { analyticsRouter } = require("./apis/google-analytics");
const { analyticsRouter2 } = require("./apis/analytics-report");
const { sitemapRouter } = require("./apis/sitemap");
const { redirectsRouter } = require("./apis/redirects");
const { redirectRouter } = require("./apis/redirect");
const { utillRouter } = require("./apis/utils");

// Serve static files for React app
// Middleware to serve static files for the main site
// app.use(express.static(path.join(__dirname, 'public/views/build')));
 
// Serve static files for uploads (media)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// API Routes
app.use(Config.server.api, mediaRouter);
app.use(Config.server.api, redirectRouter);
app.use(Config.server.api, tokenRouter);
app.use(Config.server.api, userRouters);
app.use(Config.server.api, switcherRouter);
app.use(Config.server.api, categoryRouter);
app.use(Config.server.api, settingsRouter);
app.use(Config.server.api, postRouter);
app.use(Config.server.api, tutorialRouter);
app.use(Config.server.api, chapterRouter);
app.use(Config.server.api, menuRouter);
app.use(Config.server.api, adCampaignRouter);
app.use(Config.server.api, contactRouter);
app.use(Config.server.api, commentsRouter);
app.use(Config.server.api, analyticsRouter);
app.use(Config.server.api, analyticsRouter2);
app.use(Config.server.api, utillRouter);

// Sitemap and robots files
app.use(Config.server.api, sitemapRouter);
// app.use(Config.server.redirects, redirectsRouter);

// Proxy route
app.get(Config.server.api + '/proxy', async (req, res) => {
    try {
        const url = decodeURIComponent(req.query.url);
        const response = await axios.get(url, {
            maxRedirects: 0,
            validateStatus: status => status >= 200 && status < 400,
        });
        
        const { data, status, statusText, headers } = response;
        const isRedirect = status >= 300 && status < 400;

        res.json({
            is_error: false,
            data: { status, type: statusText, is_redirect: isRedirect, url },
            message: "Fetched Successfully!"
        });

    } catch (error) {
        res.json({
            is_error: true,
            data: null,
            message: "Something went wrong"
        });
    }
});

 


// Load SSL certificate and key
const sslOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/codedtag.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/codedtag.com/cert.pem'),
};

// Create HTTPS server
https.createServer(sslOptions, app).listen(Config.server.port, () => {
    console.log(`The server is running on port ${Config.server.port}`);
});