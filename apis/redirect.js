const express = require('express');
const { Redirect } = require('../models/redirect-model');
const { middlewareTokens } = require("./secure/middlewares");

var redirectRouter = express.Router();

// Create or update redirect
redirectRouter.post('/redirect/create-update', middlewareTokens, async (req, res) => {
    try {
        const { redirects, deletedIds } = req.body;

        // Validation or additional logic can be added here
        if (!redirects || !Array.isArray(redirects) || redirects.length === 0) {
            throw new Error('Invalid request body');
        }

        let operations = redirects.map(redirect => {
            if (redirect._id) {
                // Update existing redirect
                return {
                    updateOne: {
                        filter: { _id: redirect._id },
                        update: { $set: redirect },
                        upsert: true
                    }
                };
            } else {
                // Insert new redirect
                return {
                    insertOne: {
                        document: redirect
                    }
                };
            }
        });

        // Execute bulk operations for insert and update
        const result = await Redirect.bulkWrite(operations);

        // Delete redirects with IDs in deletedIds
        if (deletedIds && deletedIds.length > 0) {
            await Redirect.deleteMany({ _id: { $in: deletedIds } });
        }

        res.status(200).send({
            is_error: false,
            data: result,
            message: 'Redirects saved successfully',
        });

    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while saving the redirects',
        });
    }
});

 
redirectRouter.get('/redirects', middlewareTokens, async (req, res) => {
     
    try {
        const { redirect_id, is_folder } = req.query;

        if (redirect_id) {
            // Fetch the specific redirect by ID
            const redirect = await Redirect.findById(redirect_id);
            if (redirect) {
                res.status(200).send({
                    is_error: false,
                    data: redirect,
                    message: 'Redirect fetched successfully',
                });
            } else {
                throw new Error('Redirect not found');
            }
        } else {
            // Fetch all redirects
            const redirects = await Redirect.find({});
            res.status(200).send({
                is_error: false,
                data: redirects,
                message: 'All redirects fetched successfully',
            });
        }
    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while fetching redirects',
        });
    }
});

 
module.exports = { redirectRouter };
