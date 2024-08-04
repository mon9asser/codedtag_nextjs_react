const express = require('express');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const path = require('path');
const mongoose = require('mongoose');
const cron = require('node-cron');
const {middlewareTokens} = require("./secure/middlewares")


const {Analytics} = require('./../models/analytics-model'); 
const { property_id } = require("./../config/db");

// Ensure the environment variable is set.
const credentialsPath = path.resolve(__dirname, 'config/credentials.json');
process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

// Initialize the Analytics Data API client.
const analyticsDataClient = new BetaAnalyticsDataClient();

// Function to get flag URL
function getFlagUrl(countryCode) {
  return `https://flagcdn.com/h20/${countryCode.toLowerCase()}.png`;
}

// Function to run the report.
async function runReport() {
  const propertyId = property_id; // Replace with your actual property ID
  const [response] = await analyticsDataClient.runReport({
    property: `properties/${propertyId}`,
    dateRanges: [
      {
        startDate: '30daysAgo', // Customize the date range as needed
        endDate: 'today',
      },
    ],
    dimensions: [
      {
        name: 'landingPagePlusQueryString', // Use 'landingPagePath' for landing page data
      },
      {
        name: 'country', // Include country name
      },
      {
        name: 'countryId', // Include country code
      }
    ],
    metrics: [
      {
        name: 'sessions',
      },
      {
        name: 'bounceRate',
      },
      {
        name: 'screenPageViews', // Added metric for page views
      },
      {
        name: 'activeUsers', // Add this metric and test
      },
      {
        name: 'newUsers', // Add this metric for new users
      },
      {
        name: 'averageSessionDuration', // Add this metric and test
      },
      {
        name: 'screenPageViewsPerSession', // Add this metric and test
      },
      {
        name: 'eventCount', // Add this metric and test
      }
    ],
  });

  const reportData = response.rows.map((row) => {
    const landingPage = row.dimensionValues[0].value;
    const country = row.dimensionValues[1].value; // Fetch country name
    const countryCode = row.dimensionValues[2].value.toLowerCase(); // Fetch country code for flag URL
    const sessions = parseFloat(row.metricValues[0].value);
    const bounceRate = (parseFloat(row.metricValues[1].value) * 100).toFixed(2) ;
    const pageViews = parseFloat(row.metricValues[2].value); // Fetch page views
    const activeUsers = parseFloat(row.metricValues[3].value);
    const newUsers = parseFloat(row.metricValues[4].value); // Fetch new users
    const averageSessionDuration = parseFloat(row.metricValues[5].value);
    const screenPageViewsPerSession = parseFloat(row.metricValues[6].value);
    const eventCount = parseFloat(row.metricValues[7].value);

    return {
      landingPage,
      country,
      countryCode,
      flagUrl: getFlagUrl(countryCode),
      sessions,
      bounceRate,
      pageViews,
      activeUsers,
      newUsers,
      averageSessionDuration,
      screenPageViewsPerSession,
      eventCount,
    };
  });

  return reportData;
}

// Function to save report data to MongoDB
async function saveReportData() {

    try {
      const reportData = await runReport();
      await Analytics.deleteMany({}); // Delete old data
      await Analytics.insertMany(reportData);
      //console.log('Report data saved successfully');
    } catch (error) {
      //console.error('Error saving report data', error);
    }

}
 


// Schedule the report to run every 25 minutes
cron.schedule('*/25 * * * *', async () => { 
    await saveReportData();
});