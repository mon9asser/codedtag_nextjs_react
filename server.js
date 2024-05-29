const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");

const {Config} = require("./config/options")

var app = express();


app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
 
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE'); // => OPTIONS, PUT,
    res.header('Access-Control-Allow-Headers', 'Content-Type , ct-public-api-key, X-api-keys , X-api-app-name , X-app-token'); // X-Requested-With
    res.header('Access-Control-Allow-Credentials', true);
    next();
});


// Routers 
const { userRouters } = require("./apis/users");
const { switcherRouter } = require("./apis/switcher");
const { settingsRouter } = require("./apis/settings");


// middlewares 
app.use( Config.server.api, userRouters );
app.use( Config.server.api, switcherRouter );
app.use( Config.server.api, settingsRouter );

// serve statics of reactJS
app.use(express.static(path.join(__dirname, 'view/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'view/build', 'index.html'));
});

app.listen(5000, () => console.log(`The server is running on port 5000`));
