const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const cors = require("cors");
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const { Config } = require("./config/options");
const axios = require("axios");


// cron jobs => google analytics 
require("./apis/anlytics");

const app = express();

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
 
app.use(express.json());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(helmet());

// Rate limiting configuration
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 200 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(apiLimiter);

// Routers 
const { tokenRouter } = require("./apis/secure/token");
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
const { redirectsRouter }  = require("./apis/redirects");
const { redirectRouter }  = require("./apis/redirect");
const { utillRouter } = require("./apis/utils");

// Serve static files for React app
app.use(express.static(path.join(__dirname, 'public/views/build')));

// API Routes
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
app.use(Config.server.sitemap, sitemapRouter);
app.use(Config.server.redirects, redirectsRouter)

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

// Handle all other routes with the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/build', 'index.html'));
});

app.listen(5000, () => console.log(`The server is running on port 5000`));
