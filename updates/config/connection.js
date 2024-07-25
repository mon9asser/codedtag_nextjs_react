const mongoose = require('mongoose');
const { Config } = require("./options");

const dbLink = Config.database.link();

mongoose.connect(dbLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 30000, // 30 seconds
})
.then(() => {
  console.log('Successfully connected to the database');
})
.catch((err) => {
  console.error('Error connecting to the database', err);
  process.exit(1);
});

mongoose.Promise = global.Promise;

// Optionally enable debugging
// mongoose.set('debug', true);

module.exports = { mongoose };