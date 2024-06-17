const mongoose = require('mongoose');

const reportDataSchema = new mongoose.Schema({
    landingPage: String,
    country: String,
    countryCode: String,
    flagUrl: String,
    sessions: Number,
    bounceRate: Number,
    pageViews: Number,
    activeUsers: Number,
    newUsers: Number,
    averageSessionDuration: Number,
    screenPageViewsPerSession: Number,
    eventCount: Number,
    timestamp: { type: Date, default: Date.now }
});

var Analytics = mongoose.model('anlytics', reportDataSchema);

module.exports = {Analytics};