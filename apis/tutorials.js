const mongoose = require('mongoose');
const express = require("express"); 
const  {Tutorial} = require("./../models/tutorial-model")
const  {Chapters} = require("./../models/chapter-model")
const  {Posts} = require("./../models/posts-model")
const {Sets} = require("./../models/settings-model");
const {Menus} = require("./../models/menus-model");
const {Usr} = require("./../models/user-model");
const {AdCampaign} = require("./../models/ad_campaign-model");
const {middlewareTokens} = require("./secure/middlewares")

var tutorialRouter = express.Router(); 
var path = require("path");
var fs = require("fs");


tutorialRouter.post("/tutorial/create-update", middlewareTokens, async (req, res) => {
    try {
        var body = req.body;

        // Assuming some form of validation or database operation happens here
        if (!body || Object.keys(body).length === 0) {
            throw new Error("Invalid request body");
        }

        // Check for the uniqueness of slug and keyphrase
        if (body.slug) {
            const existingSlug = await Tutorial.findOne({ slug: body.slug });
            if (existingSlug && (!body.tutorial_id || existingSlug._id.toString() !== body.tutorial_id)) {
                throw new Error("The slug must be unique. This slug is already in use.");
            }
        }

        if (body.keyphrase) {
            const existingKeyphrase = await Tutorial.findOne({ keyphrase: body.keyphrase });
            if (existingKeyphrase && (!body.tutorial_id || existingKeyphrase._id.toString() !== body.tutorial_id)) {
                throw new Error("The keyphrase must be unique. This keyphrase is already in use.");
            }
        }

        let savedTutorial;
        if (body.tutorial_id !== undefined && body.tutorial_id !== "") {
            // Update the existing tutorial data
            body = {...body, date_updated: Date.now()}
            savedTutorial = await Tutorial.findByIdAndUpdate(body.tutorial_id, body, { new: true });
        } else {
            // Simulate a successful operation (e.g., saving to a database)
            savedTutorial = await new Tutorial(body).save();
        }

        if (savedTutorial) {
            res.status(200).send({
                is_error: false,
                data: savedTutorial,
                message: "Tutorial saved successfully"
            });
        } else {
            throw new Error("An error occurred, please try later");
        }

    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while creating the tutorial"
        });
    }
});

tutorialRouter.get("/tutorials", middlewareTokens, async (req, res) => {
    try {
        const { tutorial_id } = req.query;

        if (tutorial_id) {
            // Fetch the specific tutorial by ID
            const tutorial = await Tutorial.findById(tutorial_id);
            if (tutorial) {
                res.status(200).send({
                    is_error: false,
                    data: tutorial,
                    message: "Tutorial fetched successfully"
                });
            } else {
                throw new Error("Tutorial not found");
            }
        } else {
            // Fetch all tutorials
            const tutorials = await Tutorial.find({});
            res.status(200).send({
                is_error: false,
                data: tutorials,
                message: "All tutorials fetched successfully"
            });
        }
    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while fetching tutorials"
        });
    }
});


tutorialRouter.post("/tutorial/delete", middlewareTokens, async (req, res) => {
    try {
        const { tutorial_id } = req.body;
         
        if (!tutorial_id) {
            throw new Error("Tutorial ID is required");
        }

        const deletedTutorial = await Tutorial.findByIdAndDelete(tutorial_id);

        if (deletedTutorial) {
            res.status(200).send({
                is_error: false,
                data: deletedTutorial,
                message: "Tutorial deleted successfully"
            });
        } else {
            throw new Error("Tutorial not found or already deleted");
        }

    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while deleting the tutorial"
        });
    }
});


tutorialRouter.get("/tutorial-page/get", middlewareTokens, async (req, res) => {
    
   try {
     
     
    
    if( ! req.query.tut_name || ! req.query.tab ) {
        throw new Error("The page could not be found");   
    }

    var tutorial_slug = req.query.tut_name;
    var tab = req.query.tab;

    var tutorial = await Tutorial.findOne({slug: tutorial_slug, "options.publish": true});
    if(tutorial == null) {
        throw new Error("The page could not be found");  
    }

    // add counter
    tutorial.views = ( tutorial.views + 1 )
    await tutorial.save();
    
    var target_tab = 'root';
    if( tab != 'root' ) {
        var tbs = tutorial.tabs.filter( x => x.slug == tab );
        
        if( tbs.length ) {
            target_tab = tbs[0]._id;
        } else {
            throw new Error("The page could not be found");
        }
    }

    // tutorial.tabs
    var chapters = await Chapters.find({'tutorial.id': tutorial._id.toString(), "tab._id": target_tab });
    var posts = await Posts.find({'tutorial.id': tutorial._id.toString(), "selected_tab._id": target_tab, post_type: 0, is_published: true});
    var menus = await Menus.find({})
    var settings = await Sets.find({})

    var ads = await AdCampaign.find({ is_enabled: true, page: target_tab == 'root'? 'tutorial_page': 'tab_page' });

    if(settings.length) {
        settings = settings[0]
    }
    var response = {
      tutorial,
      ads,
      chapters,
      posts,
      settings,
      menus
    } 

    res.send({
        redirect: false, 
        data: response,
        is_error: false, 
        message: "Fetched successfully!",
    });

   } catch (error) {
        return res.send( {
            redirect: true, // for only page 404 
            is_error: true, 
            message: error.message || "Something went wrong",
            data: []
        })
   }
})




/*
tutorialRouter.get("/home-page/get", middlewareTokens, async (req, res) => {
    
    try {
        


        var tutorials = await Tutorial.find({ "options.publish": true }); 
        var posts = await Posts.find({is_published: true });
        var settings = await Sets.find({})
        var menus = await Menus.find({});
        var user = await Usr.find({email: 'moun2030@gmail.com'});
        var ads = await AdCampaign.find({page:"homepage", is_enabled: true});

        var _settings = settings.length ? settings[0].toObject() : {};
         
        if(settings.length && user.length) { 
            var slinks = user[0].social_links.map( x => `"${x.social_link}"`)
            _settings = {..._settings, social_links: slinks};
        } 
        
        var response = {
            tutorials,
            posts,
            settings:_settings, 
            menus,
            ads
        } 
    
        res.send({
            redirect: false, 
            data: response,
            is_error: false, 
            message: "Fetched successfully!",
        });
 
    } catch (error) {
         
         return res.send( {
             redirect: true, // for only page 404 
             is_error: true, 
             message: error.message || "Something went wrong",
             data: []
         })
    }
 })
 */
 
 tutorialRouter.get("/home-page/get", middlewareTokens, async (req, res) => {
    
    try {
        


        var tutorials = await Tutorial.find({ "options.publish": true }); 
        var posts = await Posts.find({is_published: true });
        var settings = await Sets.find({})
        var menus = await Menus.find({});
        var user = await Usr.find({email: 'moun2030@gmail.com'});
        var ads = await AdCampaign.find({page:"homepage", is_enabled: true});

        var _settings = settings.length ? settings[0].toObject() : {};
         
        if(settings.length && user.length) { 
            var slinks = user[0].social_links.map( x => `"${x.social_link}"`)
            _settings = {..._settings, social_links: slinks};
        } 
        
        var response = {
            tutorials,
            posts,
            settings:_settings, 
            menus,
            ads
        } 
    
        res.send({
            redirect: false, 
            data: response,
            is_error: false, 
            message: "Fetched successfully!",
        });
 
    } catch (error) {
         
         return res.send( {
             redirect: true, // for only page 404 
             is_error: true, 
             message: error.message || "Something went wrong",
             data: []
         })
    }
 })
 
module.exports = { tutorialRouter }