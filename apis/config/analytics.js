const { BetaAnalyticsDataClient } = require('@google-analytics/data');
const { GoogleAuth } = require('google-auth-library');

// Log the environment variable to confirm it is set correctly.
//console.log('GOOGLE_APPLICATION_CREDENTIALS:', process.env.GOOGLE_APPLICATION_CREDENTIALS);

// Using a default constructor instructs the client to use the credentials
// specified in GOOGLE_APPLICATION_CREDENTIALS environment variable.
const analyticsDataClient = new BetaAnalyticsDataClient();

// Runs a simple report.
async function runReport() {
  const propertyId = '317812519'; // Replace with your actual property ID
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
    ],
    metrics: [
      {
        name: 'sessions',
      },
      {
        name: 'bounceRate',
      },
    ],
  });

  let totalSessions = 0;
  let weightedBounceRateSum = 0;

  //console.log('Report result:');
  response.rows.forEach((row) => {
    const landingPage = row.dimensionValues[0].value;
    const sessions = parseFloat(row.metricValues[0].value);
    const bounceRate = parseFloat(row.metricValues[1].value);

    totalSessions += sessions;
    weightedBounceRateSum += sessions * bounceRate;

    //console.log(`Landing Page: ${landingPage}, Sessions: ${sessions}, Bounce Rate: ${bounceRate}`);
  });

  const totalBounceRate = weightedBounceRateSum / totalSessions;

  //console.log(`Total Bounce Rate: ${totalBounceRate.toFixed(2)}%`);
}

runReport().catch(console.error);