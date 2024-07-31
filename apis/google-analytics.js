const express = require('express');   
const {Analytics} = require("./../models/analytics-model")
const {middlewareTokens} = require("./secure/middlewares")

const analyticsRouter = express.Router();


// Define the API endpoint to run the report.
analyticsRouter.get('/reports/by-countries',middlewareTokens, async (req, res) => {
  try {
    var report = await Analytics.find();

    const result = report.reduce((acc, item) => {
      const country = item.country;
      if (!acc[country]) {
        acc[country] = {
          country: country,
          countryCode: item.countryCode,
          flagUrl: item.flagUrl,
          sessions: 0,
          bounceRateSum: 0,
          pageViews: 0,
          activeUsers: 0,
          newUsers: 0,
          averageSessionDurationSum: 0,
          screenPageViewsPerSessionSum: 0,
          eventCount: 0,
          count: 0 // To calculate average bounce rate and session duration
        };
      }
      acc[country].sessions += item.sessions;
      acc[country].bounceRateSum += parseFloat(item.bounceRate);
      acc[country].pageViews += item.pageViews;
      acc[country].activeUsers += item.activeUsers;
      acc[country].newUsers += item.newUsers;
      acc[country].averageSessionDurationSum += item.averageSessionDuration;
      acc[country].screenPageViewsPerSessionSum += item.screenPageViewsPerSession;
      acc[country].eventCount += item.eventCount;
      acc[country].count += 1;

      return acc;
    }, {});

    const resultArray = Object.keys(result).map(country => {
      const data = result[country];
      return {
        country: data.country,
        countryCode: data.countryCode,
        flagUrl: data.flagUrl,
        sessions: data.sessions,
        averageBounceRate: (data.bounceRateSum / data.count).toFixed(2) + '%',
        pageViews: data.pageViews,
        activeUsers: data.activeUsers,
        newUsers: data.newUsers,
        averageSessionDuration: data.averageSessionDurationSum / data.count,
        screenPageViewsPerSession: data.screenPageViewsPerSessionSum / data.count,
        eventCount: data.eventCount
      };
    });

    res.status(200).send({
      is_error: false,
      data: resultArray,
      message: 'Report generated successfully',
    });

  } catch (error) {
    console.error(error);
    res.status(400).send({
      is_error: true,
      data: null,
      message: error.message || 'An error occurred while generating the report',
    });
  }
});

analyticsRouter.get('/reports/by-pages',middlewareTokens, async (req, res) => {
  try {
    var report = await Analytics.find();

    const result = report.reduce((acc, item) => {
      const page = item.landingPage;
      if (!acc[page]) {
        acc[page] = {
          landingPage: page,
          sessions: 0,
          bounceRateSum: 0,
          pageViews: 0,
          activeUsers: 0,
          newUsers: 0,
          averageSessionDurationSum: 0,
          screenPageViewsPerSessionSum: 0,
          eventCount: 0,
          count: 0 // To calculate average bounce rate and session duration
        };
      }
      acc[page].sessions += item.sessions;
      acc[page].bounceRateSum += parseFloat(item.bounceRate);
      acc[page].pageViews += item.pageViews;
      acc[page].activeUsers += item.activeUsers;
      acc[page].newUsers += item.newUsers;
      acc[page].averageSessionDurationSum += item.averageSessionDuration;
      acc[page].screenPageViewsPerSessionSum += item.screenPageViewsPerSession;
      acc[page].eventCount += item.eventCount;
      acc[page].count += 1;

      return acc;
    }, {});

    const resultArray = Object.keys(result).map(page => {
      const data = result[page];
      return {
        landingPage: data.landingPage,
        sessions: data.sessions,
        averageBounceRate: (data.bounceRateSum / data.count).toFixed(2) + '%',
        pageViews: data.pageViews,
        activeUsers: data.activeUsers,
        newUsers: data.newUsers,
        averageSessionDuration: data.averageSessionDurationSum / data.count,
        screenPageViewsPerSession: data.screenPageViewsPerSessionSum / data.count,
        eventCount: data.eventCount
      };
    });

    res.status(200).send({
      is_error: false,
      data: resultArray,
      message: 'Report generated successfully',
    });

  } catch (error) {
    console.error(error);
    res.status(400).send({
      is_error: true,
      data: null,
      message: error.message || 'An error occurred while generating the report',
    });
  }
});

analyticsRouter.get('/reports/total',middlewareTokens, async (req, res) => {
   
  try {
    var report = await Analytics.find();

    const total = report.reduce((acc, item) => {
      acc.sessions += item.sessions;
      acc.bounceRateSum += parseFloat(item.bounceRate) * item.sessions;
      acc.pageViews += item.pageViews;
      acc.activeUsers += item.activeUsers;
      acc.newUsers += item.newUsers;
      acc.averageSessionDurationSum += item.averageSessionDuration * item.sessions;
      acc.screenPageViewsPerSessionSum += item.screenPageViewsPerSession * item.sessions;
      acc.eventCount += item.eventCount;

      return acc;
    }, {
      sessions: 0,
      bounceRateSum: 0,
      pageViews: 0,
      activeUsers: 0,
      newUsers: 0,
      averageSessionDurationSum: 0,
      screenPageViewsPerSessionSum: 0,
      eventCount: 0
    });

    const totalSessions = total.sessions;
    const totalBounceRate = total.bounceRateSum / totalSessions;
    const totalAverageSessionDuration = total.averageSessionDurationSum / totalSessions;
    const totalScreenPageViewsPerSession = total.screenPageViewsPerSessionSum / totalSessions;

    const totals = {
      sessions: totalSessions,
      averageBounceRate: totalBounceRate.toFixed(2) + '%',
      pageViews: total.pageViews,
      activeUsers: total.activeUsers,
      newUsers: total.newUsers,
      averageSessionDuration: totalAverageSessionDuration,
      screenPageViewsPerSession: totalScreenPageViewsPerSession,
      eventCount: total.eventCount
    };

    res.status(200).send({
      is_error: false,
      data: totals,
      message: 'Total sums calculated successfully',
    });

  } catch (error) {
    console.error(error);
    res.status(400).send({
      is_error: true,
      data: null,
      message: error.message || 'An error occurred while calculating the total sums',
    });
  }


});

module.exports = { analyticsRouter };
