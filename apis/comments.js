const express = require('express');
const { Comments } = require('../models/comments-model');
var commentsRouter = express.Router();

// Create or Update Review
commentsRouter.post('/comments/create-update', async (req, res) => {
    try {

        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            throw new Error('Invalid request body');
        }

        let savedReview = await new comments(body).save();

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
            data: error,
            message: error.message || 'An error occurred while creating the review'
        });

    }
});


commentsRouter.get('/comments', async (req, res) => {
    try {
        
        const { page = 1, limit = 10 } = req.query;

        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            populate: { path: 'post_id', select: 'post_title' }
        }; 
        
        const comments = await Comments.paginate({}, options);
        
        res.status(200).send({
            is_error: false,
            data: {
                comments: comments.docs,
                currentPage: comments.page,
                totalPages: comments.totalPages
            },
            message: 'comments fetched successfully'
        });
    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while fetching comments'
        });
    }
});

// Get All comments without Pagination
commentsRouter.get('/comments/all', async (req, res) => {
    try {
        const comments = await Comments.find({});
        res.status(200).send({
            is_error: false,
            data: comments,
            message: 'All comments fetched successfully'
        });
    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || 'An error occurred while fetching all comments'
        });
    }
});

// Delete Review
commentsRouter.delete('/comments', async (req, res) => {
    try {
        const { _id } = req.body;
        if (!_id) throw new Error('Review ID is required');

        await Comments.findByIdAndDelete(_id);
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

module.exports = { commentsRouter };
