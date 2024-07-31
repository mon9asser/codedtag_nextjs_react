const express = require('express');
const { Comments } = require('../models/comments-model');
const { body, validationResult } = require('express-validator');
const {middlewareTokens} = require("./secure/middlewares")


var commentsRouter = express.Router();

// Define the validation and sanitization middleware
const commentValidation = [
    body('comment').isString().trim().escape().isLength({ max: 500 }).withMessage('Comment is too long'),
    body('data_id').isString().trim().escape().withMessage('Data ID must be a string'),
    body('data_title').isString().trim().escape().isLength({ max: 200 }).withMessage('Data title is too long'),
];
 
// Create or Update Review
commentsRouter.post('/comments/create-update', middlewareTokens, async (req, res) => {
    try {


        // Define the validation and sanitization
        await Promise.all(commentValidation.map(validation => validation.run(req)));
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new Error( 'Sorry, something went wrong');
        }
         
        const body = req.body;

        if (!body || Object.keys(body).length === 0) {
            throw new Error('Invalid request body');
        }

        var _comments = await Comments.findOne({data_id: body.data_id });
         
        if( _comments != null ) {

            if( body.comment != '' )
                _comments.comments = [..._comments.comments, body.comment];
            
            if( body.thumb ) {
                _comments.like_counts = _comments.like_counts + 1
            } else {
                _comments.dis_like_counts = _comments.dis_like_counts + 1
            } 
            _comments.data_title = body.data_title; 
        }

        let savedReview = await ( _comments != null ? _comments : new Comments(body) ).save();

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


commentsRouter.get('/comments', middlewareTokens, async (req, res) => {
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
commentsRouter.get('/comments/all', middlewareTokens, async (req, res) => {
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
commentsRouter.delete('/comments', middlewareTokens, async (req, res) => {
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
