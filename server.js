const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");
const cors = require("cors");

const {Config} = require("./config/options")

var app = express();


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
 

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

// middlewares 
app.use( Config.server.api, userRouters );
app.use( Config.server.api, switcherRouter );
app.use( Config.server.api, categoryRouter);
app.use( Config.server.api, settingsRouter );
app.use( Config.server.api, postRouter);
app.use( Config.server.api, tutorialRouter);
app.use( Config.server.api, chapterRouter);



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
