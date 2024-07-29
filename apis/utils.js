const express = require("express");  
var utillRouter = express.Router(); 
const mongoose = require('mongoose');
var path = require("path");
var fs = require("fs");
 
const {Config} = require("./../config/options")
// database models 
const {Usr} = require("./../models/user-model");
const {Tutorial} = require("./../models/tutorial-model");
const {Posts} = require("./../models/posts-model");
const {Menus} = require("./../models/menus-model"); 
const {Sets} = require("./../models/settings-model"); 
const { check, validationResult } = require('express-validator');
const {AdCampaign} = require("./../models/ad_campaign-model"); 

const jwt = require('jsonwebtoken');
const { verifyToken } = require("./secure/auth");


// search 
utillRouter.get('/search', verifyToken, async (req, res) => {

    var settings = await Sets.find({});
    var menus = await Menus.find({});
    var ads = await AdCampaign.find({page: 'search_page', is_enabled: true })

    await check('q')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .withMessage('Search query parameter is required')
        .isLength({ min: 1, max: 100 })
        .withMessage('Search query must be between 1 and 100 characters')
        .run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.json({ 
            is_error: true, 
            data: [], 
            settings,
            menus,
            message: errors.array().map(err => err.msg).join(', ') 
        });
    }

    try {
        const query = req.query.q;

        // Use $text for full-text search
        const response = await Posts.find({ $text: { $search: query }, post_type: 0 });
        
        
        return res.send({
            is_error: false,
            data: response,
            settings,
            menus,
            ads,
            message: 'Fetched successfully!'
        });

    } catch (error) {
        res.send({
            is_error: true,
            data: [],
            settings,
            menus,
            ads,
            message: error.message || 'Something went wrong!'
        });
    }
}); 

// generate token 
utillRouter.get("/hash-request", async(req, res) => {

    if( ! req.headers.agent || ! req.headers.api_keys ) {
        return res.send({
            is_error: true, 
            message: 'Invalid credentials or api keys',
            data: []
        })
    }

    // validate api keys 
    if( req.headers.api_keys !== Config.api_keys ) {
        return res.send({
            is_error: true, 
            message: 'Invalid credentials or api keys',
            data: []
        })
    }

    const payload = {
        agent: req.headers.agent,
        // other payload data
    };
    
    // Secret key
    const secretKey = Config.jwt_secret;
      
    // Options
    const options = {
        expiresIn: '1m' // Token will expire in 5 minutes
    };
      
    try {
        // Generating the token
        const token = jwt.sign(payload, secretKey, options);

        
        res.send({
            data: token,
            is_error: false, 
            message: 'token fetched successfully!'
        });
    } catch (error) {
        return res.send({
            is_error: true, 
            message: 'Invalid credentials or api keys',
            data: []
        })
    }

})

module.exports = { utillRouter }