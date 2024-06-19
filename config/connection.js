const mongoose = require('mongoose');
const {Config} = require("./options");
 
mongoose.connect(Config.database.link() + `?directConnection=true`);
 
mongoose.Promise = global.Promise;
 


module.exports = {mongoose};