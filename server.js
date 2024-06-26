const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const cors = require("cors");
 
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const {Config} = require("./config/options")
const axios = require("axios");

// cron jobs => google analytics 
require("./apis/anlytics");


var app = express();





app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(helmet());

 // Rate limiting configuration
const apiLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
});

// Apply rate limiter to all requests
app.use(apiLimiter);

/*
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'); // => OPTIONS, PUT,
    res.header('Access-Control-Allow-Headers', 'Content-Type , ct-public-api-key, X-api-keys , X-api-app-name , X-app-token'); // X-Requested-With
    res.header('Access-Control-Allow-Credentials', true);
    next();
});
*/

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  };
app.use(cors(corsOptions));

// Routers 
const { userRouters } = require("./apis/users");
const { switcherRouter } = require("./apis/switcher");
const { categoryRouter } = require("./apis/category");
const { settingsRouter } = require("./apis/settings");
const { postRouter } = require("./apis/posts");
const { tutorialRouter } = require("./apis/tutorials");
const { chapterRouter } = require("./apis/chapters");
const { menuRouter } = require("./apis/menus")
const {adCampaignRouter} = require("./apis/campaigns");
const {contactRouter} = require("./apis/contact");
const {commentsRouter} = require("./apis/comments");
const {analyticsRouter} = require("./apis/google-analytics");

const { required } = require("yargs");

const { analyticsRouter2 } = require("./apis/analytics-report");


// sitemaps and robots files 
const { sitemapRouter } = require("./apis/sitemap");

// middlewares 
app.use( Config.server.api, userRouters );
app.use( Config.server.api, switcherRouter );
app.use( Config.server.api, categoryRouter);
app.use( Config.server.api, settingsRouter );
app.use( Config.server.api, postRouter);
app.use( Config.server.api, tutorialRouter);
app.use( Config.server.api, chapterRouter);
app.use( Config.server.api, menuRouter);
app.use( Config.server.api, adCampaignRouter);
app.use( Config.server.api, contactRouter);
app.use( Config.server.api, commentsRouter);
app.use( Config.server.api, analyticsRouter);
app.use( Config.server.api, analyticsRouter2);


// update in server
app.use( Config.server.sitemap, sitemapRouter);





app.get(Config.server.api + '/proxy', async (req, res) => {
    try {
        const url = decodeURIComponent(req.query.url); 
        console.log(url);
        const response = await axios.get(url, {
            maxRedirects: 0,
            validateStatus: function (status) {
                return status >= 200 && status < 400; // default
            }
        });
        
        // Extract only the necessary data
        const { data, status, statusText, headers } = response;
        
        const is_redirect = status >= 300 && status < 400;

        const objex = {
            status: status,
            type: statusText,
            is_redirect: is_redirect,
            url: url
        };

        res.json({
            is_error: false, 
            data: objex, 
            message: "Fetched Successfully!"
        });

    } catch (error) { 
        
        // Handle the error properly 
        res.json({
            is_error: true, 
            data: null, 
            message: "Something went wrong"
        });
    }
});



// server image uploads
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// serve statics of reactJS
/*
app.use(express.static(path.join(__dirname, 'view/build')));

app.use('/admin', express.static(path.join(__dirname, 'public/admin')));
app.use('/codedtag', express.static(path.join(__dirname, 'public/codedtag')));
app.use('/accounting', express.static(path.join(__dirname, 'public/accounting')));

app.get('/codedtag/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/codedtag', 'index.html'));
});

app.get('/accounting/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/accounting', 'index.html'));
});

app.get('/admin/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/accounting', 'index.html'));
});*/


app.listen(5000, () => console.log(`The server is running on port 5000`));
