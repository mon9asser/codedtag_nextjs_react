const express = require('express');
const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const {middlewareTokens} = require("./secure/middlewares")

const path = require('path');
const fs = require('fs');

var analyticsRouter2 = express.Router();

const { property_id } = require("../config/db");

// Ensure the environment variable is set.
const credentialsPath = path.resolve(__dirname, 'config/credentials.json');

// Check if the credentials file exists
if (!fs.existsSync(credentialsPath)) {
  throw new Error(`The file at ${credentialsPath} does not exist.`);
}

process.env.GOOGLE_APPLICATION_CREDENTIALS = credentialsPath;

// Initialize the Analytics Data API client.
const analyticsDataClient = new BetaAnalyticsDataClient();

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
        name: 'sessionDefaultChannelGroup', // Default channel group for traffic acquisition
      },
    ],
    metrics: [
      {
        name: 'totalUsers',
      },
      {
        name: 'engagedSessions',
      },
      {
        name: 'sessions',
      }, 
      {
        name: 'engagementRate',
      },
      {
        name: 'bounceRate',
      },
      {
        name: 'activeUsers',
      },
    ],
  });

  const aggregatedData = response.rows.reduce((acc, row) => {
    const channelGroup = row.dimensionValues[0].value;
    const totalUsers = parseFloat(row.metricValues[0].value);
    const engagedSessions = parseFloat(row.metricValues[1].value);
    const sessions = parseFloat(row.metricValues[2].value);
    // const averageEngagementTimePerSession = parseFloat(row.metricValues[3].value);
    const engagementRate = parseFloat(row.metricValues[3].value) * 100; // Convert to percentage
    const bounceRate = parseFloat(row.metricValues[4].value) * 100; // Convert to percentage
    const activeUsers = parseFloat(row.metricValues[5].value); // Convert to percentage

    if (!acc[channelGroup]) {
      acc[channelGroup] = {
        channelGroup,
        totalUsers: 0,
        engagedSessions: 0,
        sessions: 0,
        // averageEngagementTimePerSession: 0,
        engagementRate: 0,
        bounceRate: 0,
        activeUsers: 0
      };
    }

    acc[channelGroup].totalUsers += totalUsers;
    acc[channelGroup].engagedSessions += engagedSessions;
    acc[channelGroup].sessions += sessions;
   //  acc[channelGroup].averageEngagementTimePerSession += averageEngagementTimePerSession;
    acc[channelGroup].engagementRate += engagementRate;
    acc[channelGroup].bounceRate += bounceRate;
    acc[channelGroup].activeUsers += activeUsers;
    

    return acc;
  }, {});

  // Convert aggregatedData to an array
  const reportData = Object.values(aggregatedData);

  return reportData;
}

// Route to fetch analytics data
analyticsRouter2.get('/reports', async (req, res) => {
  try {
    const reportData = await runReport();
    res.status(200).json({ is_error: false, data: reportData });
  } catch (error) {
    res.status(500).json({ is_error: true, message: error.message, data: [] });
  }
});

module.exports = {analyticsRouter2};
