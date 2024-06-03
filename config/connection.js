const mongoose = require('mongoose');
const {Config} = require("./options");

console.log(Config.database.link());
mongoose.connect(Config.database.link());
 
mongoose.Promise = global.Promise;
 


module.exports = {mongoose};