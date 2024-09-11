const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const axios = require("axios");

// Importing cron jobs for Google Analytics
require("./apis/anlytics");

const app = express();

const corsOptions = {
    origin: "*",
    credentials: true,
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
      connectSrc: ["'self'", 'http://localhost:3000', 'http://localhost:1000'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      styleSrcElem: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:'],
      mediaSrc: ["*"],
      scriptSrc: ["'self'", 'https://www.google.com/recaptcha/', 'https://www.gstatic.com/recaptcha/'],
      frameSrc: ["'self'", 'https://www.google.com/recaptcha/', 'https://www.gstatic.com/recaptcha/'],
    },
  })
);

// Rate limiting configuration
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // Limit each IP to 300 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use(apiLimiter);

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

// Serve static files for uploads (media)
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// API Routes
app.use('/api', mediaRouter);
app.use('/api', redirectRouter);
app.use('/api', tokenRouter);
app.use('/api', userRouters);
app.use('/api', switcherRouter);
app.use('/api', categoryRouter);
app.use('/api', settingsRouter);
app.use('/api', postRouter);
app.use('/api', tutorialRouter);
app.use('/api', chapterRouter);
app.use('/api', menuRouter);
app.use('/api', adCampaignRouter);
app.use('/api', contactRouter);
app.use('/api', commentsRouter);
app.use('/api', analyticsRouter);
app.use('/api', analyticsRouter2);
app.use('/api', utillRouter);

// Sitemap and robots files
app.use('/api', sitemapRouter);

// Proxy route
app.get('/api/proxy', async (req, res) => {
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

// Create HTTP server (for localhost)
app.listen(3000, () => {
    console.log(`The server is running on port 3000`);
});
