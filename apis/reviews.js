const express = require('express');
const { Reviews } = require('./../models/reviews-model');
var reviewRouter = express.Router();

// Create or Update Review
reviewRouter.post('/reviews/create-update', async (req, res) => {
    try {
        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            throw new Error('Invalid request body');
        }

        let savedReview = await new Reviews(body).save();

        if (savedReview) {
            res.status(200).send({
                is_error: false,
                data: savedReview,
                message: 'Review saved successfully'
            });
        } else {
            throw new Error('An error occurred, please try later');
        }

    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while creating the review'
        });
    }
});


reviewRouter.get('/reviews', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: { date: -1 }
        }; 
        const reviews = await Reviews.paginate({}, options);
        
        res.status(200).send({
            is_error: false,
            data: {
                reviews: reviews.docs,
                currentPage: reviews.page,
                totalPages: reviews.totalPages
            },
            message: 'Reviews fetched successfully'
        });
    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while fetching reviews'
        });
    }
});

// Get All Reviews without Pagination
reviewRouter.get('/reviews/all', async (req, res) => {
    try {
        const reviews = await Reviews.find({});
        res.status(200).send({
            is_error: false,
            data: reviews,
            message: 'All reviews fetched successfully'
        });
    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while fetching all reviews'
        });
    }
});

// Delete Review
reviewRouter.delete('/reviews', async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) throw new Error('Review ID is required');

        await Reviews.findByIdAndDelete(_id);
        res.status(200).send({
            is_error: false,
            message: 'Review deleted successfully'
        });
    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while deleting the review'
        });
    }
});

module.exports = { reviewRouter };
