const mongoose = require('mongoose');
const express = require("express"); 
const  {Categories} = require("./../models/category-model")
const {middlewareTokens} = require("./secure/middlewares")
const { check, validationResult } = require('express-validator');
var redirectsRouter = express.Router(); 
var path = require("path");
var fs = require("fs");
var { Redirect } = require("./../models/redirect-model");
var { Posts } = require("./../models/posts-model");

// redirects for main folder
redirectsRouter.get("/:folder/", [
    check('folder')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .isLength({ min: 1, max: 50 })
], async (req, res) => {
    
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        // ('Validation errors:', errors.array());
        return res.sendFile(path.join(__dirname, './../public/views/build', 'index.html'));
    }
    
    var tutorial_slug_from = `/${req.params.folder}/`;
    const redirects = await Redirect.find({from: tutorial_slug_from, isFolder: true});

    if(redirects.length) {
        var redirect = redirects[0];  
        return res.redirect(parseInt(redirect.redirectType), redirect.to);
    } 

    res.sendFile(path.join(__dirname, './../public/views/build', 'index.html'));
});
 

// redirects for subfolder
redirectsRouter.get("/:folder/:subfolder/", [
    check('folder')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .isLength({ min: 1, max: 50 }),
    check('subfolder')
        .trim()
        .escape()
        .not()
        .isEmpty()
        .isLength({ min: 1, max: 100 })
], async (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        //console.log('Validation errors:', errors.array());
        return res.sendFile(path.join(__dirname, './../public/views/build', 'index.html'));
    }

    var tutorial_slug_from = `/${req.params.folder}/`;
    const redirects = await Redirect.find({from: tutorial_slug_from, isFolder: false});
    if(!redirects.length) {
        return res.sendFile(path.join(__dirname, './../public/views/build', 'index.html'));
    }
    var redirect = redirects[0];
    
    // checking for subfolder( post ) is already exists on not
    var finder = await Posts.findOne({slug: req.params.subfolder });
    if(finder == null ) {
        return res.sendFile(path.join(__dirname, './../public/views/build', 'index.html'));
    }
    
    var redirect_to = `${redirect.to}${req.params.subfolder}/`;
    return res.redirect(parseInt(redirect.redirectType), redirect_to );
    
});

module.exports = { redirectsRouter }