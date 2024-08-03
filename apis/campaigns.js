const express = require('express');
const { AdCampaign } = require('../models/ad_campaign-model');
const {middlewareTokens} = require("./secure/middlewares")

var adCampaignRouter = express.Router();

adCampaignRouter.post('/ad_campaign/create-update', middlewareTokens, async (req, res) => {

    
    try {
        const { campaigns, deletedIds } = req.body;

        // Validation or additional logic can be added here
        if (!campaigns || !Array.isArray(campaigns) || campaigns.length === 0) {
            throw new Error('Invalid request body');
        }

        let operations = campaigns.map(campaign => {
            if (campaign._id) {
                // Update existing campaign
                return {
                    updateOne: {
                        filter: { _id: campaign._id },
                        update: { $set: campaign },
                        upsert: true
                    }
                };
            } else {
                // Insert new campaign
                return {
                    insertOne: {
                        document: campaign
                    }
                };
            }
        });

        // Execute bulk operations for insert and update
        const result = await AdCampaign.bulkWrite(operations);

        // Delete campaigns with IDs in deletedIds
        if (deletedIds && deletedIds.length > 0) {
            await AdCampaign.deleteMany({ _id: { $in: deletedIds } });
        }

        res.status(200).send({
            is_error: false,
            data: result,
            message: 'Campaigns saved successfully',
        });

    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while saving the campaigns',
        });
    }
});


adCampaignRouter.get('/ad_campaigns', middlewareTokens, async (req, res) => {
    try {
        const { campaign_id } = req.query;

        if (campaign_id) {
            // Fetch the specific campaign by ID
            const campaign = await AdCampaign.findById(campaign_id);
            if (campaign) {
                res.status(200).send({
                    is_error: false,
                    data: campaign,
                    message: 'Campaign fetched successfully',
                });
            } else {
                throw new Error('Campaign not found');
            }
        } else {
            // Fetch all campaigns
            const campaigns = await AdCampaign.find({});
            res.status(200).send({
                is_error: false,
                data: campaigns,
                message: 'All campaigns fetched successfully',
            });
        }
    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while fetching campaigns',
        });
    }
});

module.exports = { adCampaignRouter };

