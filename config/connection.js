const mongoose = require('mongoose');
const { Config } = require("./options");

const dbLink = Config.database.link();

// mongoose.set('debug', true); // Enable debugging for more detailed logs

mongoose.connect(dbLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
})
.then(() => {
 // console.log('Successfully connected to the database');
})
.catch((err) => {
  //console.error('Error connecting to the database', err);
  process.exit(1);
});

mongoose.Promise = global.Promise;

module.exports = { mongoose };