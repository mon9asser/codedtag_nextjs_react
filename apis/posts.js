const mongoose = require('mongoose');
const express = require("express");
const { name, domain } = require("./../config/db");
const {middlewareTokens} = require("./secure/middlewares")

var postRouter = express.Router();
var path = require("path");
var fs = require("fs");
const { Config } = require("./../config/options");
const { Helper } = require("./../config/helper");
const multer = require('multer');
const sharp = require('sharp');
const { Posts } = require("./../models/posts-model");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { Sets } = require('./../models/settings-model');
const { Usr } = require('../models/user-model');
const { Chapters } = require("../models/chapter-model");
const { Tutorial } = require('../models/tutorial-model');
const { Menus } = require('../models/menus-model');
const { AdCampaign } = require('../models/ad_campaign-model')
const { updateImageDetails, bulkUpdateInsertMedia } = require('./media');

// Handle Upload images of posts 
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
});


// Function to ensure directory exists
const ensureDirectoryExistence = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

 
 

postRouter.post("/upload-image", upload.single('image'), async (req, res) => {
    
    const filePath = req.file.buffer;

    const now = new Date();
    const year = now.getFullYear().toString();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    var build_folder = `${Config.uploads.folder}/${Config.uploads.serve}`;
    const uploadPath = path.join(build_folder, year, month, day);
    ensureDirectoryExistence(uploadPath);
    
    var file_name = Helper.removeLastExtension(req.file.originalname);
    var extension = Helper.getLastExtension(req.file.originalname);

    var randomizer = Math.floor(1000 + Math.random() * 9000);
    var new_file_name = `${file_name}-${randomizer}.webp`;

    try {
        // Get the metadata of the image
        const metadata = await sharp(filePath).metadata();

        let resizeWidth = metadata.width;

        // Set max width to 800px if the original width is greater than 800px
        if (metadata.width > 800) {
            resizeWidth = 800;
        }

        if (metadata.width < 500) {
            resizeWidth = 500;
        }

        // Resize and convert image to WebP
        await sharp(filePath)
            .resize(resizeWidth) // Resize to the calculated width
            .toFormat('webp', { quality: 95 })
            .toFile(`${uploadPath}/${new_file_name}`);
          
        var file_url = `${Config.media_url}/${year}/${month}/${day}/${new_file_name}`;
        
        // Call updateImageDetails to store the image information in the Media model
        const updateResult = await updateImageDetails({
            title: new_file_name,
            description: '',
            name: new_file_name,
            url: file_url,

            is_model: true, // if releate another model not direct
            model_name: '', // like post, settings 
            model_id: '', // post id or setting id 
            block_id: '' // block of image id inside post
        }); 
         
        if( updateResult.is_error ) {
            return; 
        }

        res.json({ success: 1, file: { url: file_url, width: resizeWidth, media_id: updateResult.data._id } });
    } catch (error) {
        console.error('Error processing image:', error);
        res.status(500).send('Error processing image.');
    }
});


postRouter.post("/post/create-update", middlewareTokens, async (req, res) => {
    try {
        const body = req.body;

        // Validate the request body
        if (!body || Object.keys(body).length === 0) {
            throw new Error("Invalid request body");
        }

        // Extract the fields for validation
        const { slug, post_type, tutorial, keyphrase } = body;

        if (!slug || !keyphrase) {
            throw new Error("Missing required fields: slug and post_type and keyphrase");
        }

        // Ensure keyphrase is in lowercase
        if (keyphrase) {
            body.keyphrase = keyphrase.toLowerCase();
        }

       

        let savedPost;

        var post_id_string = '';

        if (body.post_id) {

            post_id_string = body.post_id;
            // Update the existing post data
            const existingPost = await Posts.findById(body.post_id);
            if (existingPost) {
                // Construct the query for finding conflicting posts by slug, post_type, and tutorial
                const query = { slug, post_type, _id: { $ne: body.post_id } };
                if (tutorial && tutorial.id) {
                    query["tutorial.id"] = tutorial.id;
                }

                // Check if a conflicting post exists
                const conflictingPost = await Posts.findOne(query);
                if (conflictingPost) {
                    throw new Error("A post with the same slug, post_type, and tutorial already exists");
                }

                // Check for conflicting keyphrase
                if (body.keyphrase) {
                    const keyphraseQuery = { keyphrase: body.keyphrase, _id: { $ne: body.post_id } };
                    const conflictingKeyphrasePost = await Posts.findOne(keyphraseQuery);
                    if (conflictingKeyphrasePost) {
                        throw new Error("A post with the same keyphrase already exists");
                    }
                }

                savedPost = await Posts.findByIdAndUpdate(body.post_id, body, { new: true });
            } else {
                throw new Error("Post not found");
            }
        } else {
            // Construct the query for finding existing posts by slug, post_type, and tutorial
            const query = { slug, post_type };
            if (tutorial && tutorial.id) {
                query["tutorial.id"] = tutorial.id;
            }

            // Check if a post with the same slug, post_type, and tutorial.id (if exists) already exists
            const existingPost = await Posts.findOne(query);
            if (existingPost) {
                throw new Error("A post with the same slug, post_type, and tutorial already exists");
            }

            // Check for conflicting keyphrase
            if (body.keyphrase) {
                const keyphraseQuery = { keyphrase: body.keyphrase };
                const existingKeyphrasePost = await Posts.findOne(keyphraseQuery);
                if (existingKeyphrasePost) {
                    throw new Error("A post with the same keyphrase already exists");
                }
            }

            // Create a new post
            savedPost = await new Posts(body).save();

            post_id_string = savedPost._id;
            
        }


        // saving information related post on media 
        if( post_id_string !== '' ) {

            var mediaArray = body.blocks.filter(x => x.type == "image").map(img => {
                return {
                    id: img.data.file.media_id, 
                    title: img.data.caption, 
                    
                    is_model: true, 
                    model_name: 'post', 
                    model_id: post_id_string, 
                    block_id: img.id 
                };
            });

            // storing data into the media model 
            await bulkUpdateInsertMedia(mediaArray);

        }


        if (savedPost) {
            res.status(200).send({
                is_error: false,
                data: savedPost,
                message: "Post saved successfully"
            });
        } else {
            throw new Error("An error occurred, please try later");
        }

    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while creating or updating the post"
        });
    }
});


postRouter.post("/post/create-update/v2", middlewareTokens, async (req, res) => {
    try {
        const body = req.body;

        // Validate the request body
        if (!body || Object.keys(body).length === 0) {
            throw new Error("Invalid request body");
        }

        // Extract the fields for validation
        const { slug, post_type, tutorial } = body;
        if (!slug || !post_type) {
            throw new Error("Missing required fields: slug and post_type");
        }

        let savedPost;

        if (body.post_id) {
            // Update the existing post data
            const existingPost = await Posts.findById(body.post_id);
            if (existingPost) {
                // Construct the query for finding conflicting posts
                const query = { slug, post_type, _id: { $ne: body.post_id } };
                if (tutorial && tutorial.id) {
                    query["tutorial.id"] = tutorial.id;
                }

                // Check if a conflicting post exists
                const conflictingPost = await Posts.findOne(query);
                if (conflictingPost) {
                    throw new Error("A post with the same slug, post_type, and tutorial already exists");
                }

                savedPost = await Posts.findByIdAndUpdate(body.post_id, body, { new: true });
            } else {
                throw new Error("Post not found");
            }
        } else {
            // Construct the query for finding existing posts
            const query = { slug, post_type };
            if (tutorial && tutorial.id) {
                query["tutorial.id"] = tutorial.id;
            }

            // Check if a post with the same slug, post_type, and tutorial.id (if exists) already exists
            const existingPost = await Posts.findOne(query);
            if (existingPost) {
                throw new Error("A post with the same slug, post_type, and tutorial already exists");
            }

            // Create a new post
            savedPost = await new Posts(body).save();
        }

        if (savedPost) {
            res.status(200).send({
                is_error: false,
                data: savedPost,
                message: "Post saved successfully"
            });
        } else {
            throw new Error("An error occurred, please try later");
        }

    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while creating or updating the post"
        });
    }
});



postRouter.post("/post/create-update/v1", middlewareTokens, async (req, res) => {
    try {
        const body = req.body;

        // Validate the request body
        if (!body || Object.keys(body).length === 0) {
            throw new Error("Invalid request body");
        }

        // Extract the fields for validation
        const { slug, post_type, tutorial } = body;
        if (!slug || !post_type) {
            throw new Error("Missing required fields: slug and post_type");
        }

        // Construct the query for finding existing posts
        const query = { slug, post_type };
        if (tutorial && tutorial.id) {
            query["tutorial.id"] = tutorial.id;
        }

        // Check if a post with the same slug, post_type, and tutorial.id (if exists) already exists
        const existingPost = await Posts.findOne(query);
        if (existingPost && (!body.post_id || body.post_id !== existingPost._id.toString())) {
            throw new Error("A post with the same slug, post_type, and tutorial already exists");
        }

        let savedPost;
        if (body.post_id !== undefined && body.post_id !== "") {
            // Update the existing post data
            savedPost = await Posts.findByIdAndUpdate(body.post_id, body, { new: true });
        } else {
            // Create a new post
            savedPost = await new Posts(body).save();
        }

        if (savedPost) {
            res.status(200).send({
                is_error: false,
                data: savedPost,
                message: "Post saved successfully"
            });
        } else {
            throw new Error("An error occurred, please try later");
        }

    } catch (error) {
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while creating or updating the post"
        });
    }
});




postRouter.post("/post/update-link", middlewareTokens, async (req, res) => {
     
    try {
         
        var {post_id, paragraph_id, keyword, target, url, rel } = req.body.old;
        var updated_url = req.body.update.url;
        var site_name = req.body.update.site_name;
        var updated_target = req.body.update.target;
        var updated_rel = req.body.update.rel;
        var updated_keyword = req.body.update.keyword;

        var post = await Posts.findOne({_id: post_id });
        if( post == null ) {
            throw new Error("No posts created before for this link");
        } 

        // update blocks 
        var new_blocks = post.blocks.map( x => {

            if( x.id == paragraph_id ) {

                // paragraph.
                if( x.type == 'paragraph' ) {
 
                    const dom = new JSDOM(x.data.text);
                    const document = dom.window.document;
                    const anchors = document.querySelectorAll('a');
                    anchors.forEach(anchor => {
                        
                        var get_url = anchor.getAttribute("href")
                        if( get_url == url ) {
                            anchor.setAttribute("rel", updated_rel)
                            anchor.setAttribute("target", updated_target )
                            anchor.setAttribute("href", updated_url )
                            anchor.innerHTML = updated_keyword;
                        }
                        
                    }); 

                    const modifiedHtmlString = document.body.innerHTML;  
                    x.data.text = modifiedHtmlString
                } 

                // list
                if( x.type == 'list' ) { 
                    var marked_string = "***********";
                    var itemList = x.data.items.join(marked_string);

                    const dom = new JSDOM(itemList);
                    const document = dom.window.document;
                    const anchors = document.querySelectorAll('a');
                    anchors.forEach(anchor => {
                        
                        var get_url = anchor.getAttribute("href")
                        if( get_url == url ) {
                            anchor.setAttribute("rel", updated_rel)
                            anchor.setAttribute("target", updated_target )
                            anchor.setAttribute("href", updated_url )
                            anchor.innerHTML = updated_keyword;
                        }
                        
                    }); 

                    const joined = document.body.innerHTML;  
                    var converted = [joined]
                    if( joined.indexOf(marked_string) != -1 ) {
                        converted = joined.split(marked_string)
                    }  

                    x.data.items = converted;

                } 

                // table
                if( x.type == 'table' ) { 
                 

                    const processedData = x.data.content.map(array => {
                        return array.map(htmlString => {

                            const dom = new JSDOM(htmlString);
                            const document = dom.window.document;
                            
                            const anchor = document.querySelector('a');
                            
                            if( anchor.getAttribute("href") != url || anchor.innerHTML != keyword ) {
                                return htmlString;
                            }

                            anchor.setAttribute("href", updated_url );
                            anchor.setAttribute("rel", updated_rel );
                            anchor.setAttribute("target", updated_target );
                            anchor.innerHTML = updated_keyword;

                            return document.body.innerHTML;

                        });
                    });
                     
                    x.data.content = processedData   
                }   
                 
            
            }

            return x; 

        });

        // update links
        var new_links = post.links.map( x => {
            
            if(x.paragraph_id == paragraph_id) {
                var long_site = Helper.extractDomainAndSubdomain(updated_url);
                 

                // working with dom element 
                const dom = new JSDOM(x.element);
                const document = dom.window.document;
                const _anchor_el = document.querySelector('a');
                
                if( _anchor_el.getAttribute("href") == url && _anchor_el.innerHTML == keyword ) {
                    _anchor_el.setAttribute("href", updated_url );
                    _anchor_el.setAttribute("rel", updated_rel );
                    _anchor_el.setAttribute("target", updated_target );
                    _anchor_el.innerHTML = updated_keyword;
                    x.element = document.body.innerHTML;
                    x.url = updated_url; 
                    x.is_external = updated_url.toString().indexOf( site_name ) == -1 ? true: false;
                    x.is_redirect = false;
                    x.keyword = updated_keyword;
                    x.status = 200; 
                    x.domain_name= long_site.domain;
                    x.subdomain= long_site.subdomain;
                    x.target = updated_target;
                    x.type = "OK";
                } 
            }

            return x;
        }); 

        var pst = await Posts.updateOne(
            { _id: post_id },
            { $set: { blocks: new_blocks, links: new_links } }
        );
       
        return res.send({
            is_error: false, 
            data: pst, 
            message: ""
        });
        
    } catch (error) {
        res.send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while creating or updating the post"
        });
    }

    //res.send({post_id, paragraph_id, keyword, target, url, updated_url, updated_target, updated_keyword})
});


postRouter.post("/post/validate_urls", middlewareTokens, async (req, res) => {
    
    var url = decodeURIComponent(req.body.url);
     
    var objx = {
        is_error: true,
        data: null,
        message: "success"
    } 

    if( url == undefined ) {
        return res.send(objx);
    }

    var link_data = await Helper.link_validator(url);
     
    if (link_data.is_error) {

        objx.data = {
            status: 404,
            type: '',
            is_redirect: false,
            url: url
        };

        return res.send(objx);
    }
 
    return res.send({
        is_error: link_data.is_error,
        data: link_data.data,
        message: link_data.message
    });
});

// middlewareTokens
postRouter.get("/post-links/get", middlewareTokens, async (req, res) => {

    const post_type = req.query.post_type;
    const query_object = post_type ? { post_type: post_type } : {};

    // Fetch posts based on the post_type
    const posts = await Posts.find(query_object);

    if (!posts.length) {
        return res.status(404).send({
            is_error: true,
            data: null,
            message: "No links found!"
        });
    }
        
    // Flatten the links with related post data
    const links = posts.flatMap(post => {
        return (post.links || []).map(link => ({
            ...link,
            post_id: post._id,
            post_title: post.post_title,
            slug: post.slug
        }));
    });

    return res.status(200).send({
        is_error: false,
        data: links,
        message: "Links of Posts retrieved successfully!"
    });
    
});

 
postRouter.get("/post-links/get/v1", middlewareTokens, async (req, res) => {
    
    try {
        const post_type = req.query.post_type;
         
        var query_object = {};
        if( post_type != undefined ) {
            query_object = { post_type: post_type };
        }

        // Fetch posts based on the post_type
        const posts = await Posts.find(query_object);

       
        
        if( ! posts.length ) {
            return res.status(404).send({
                is_error: true,
                data: null,
                message: "No links found!"
            });
        }

        const links = await Promise.all(posts.map(async post => {
            if (!post.links || !Array.isArray(post.links)) {
                return [];
            }

            return Promise.all(post.links.map(async link => {
                let objx = {
                    ...link,
                    post_id: post._id,
                    post_title: post.post_title,
                    slug: post.slug
                };

                try {
                    var link_data = await Helper.link_validator(link.url);
                    if (link_data.is_error) {
                        objx = {
                            ...objx,
                            status: 404,
                            type: '',
                            is_redirect: false,
                            url: ''
                        };
                    } else {
                        objx = {
                            ...objx,
                            ...link_data.data
                        };
                    }
                } catch (err) {
                    objx = {
                        ...objx,
                        status: 404,
                        type: '',
                        is_redirect: false,
                        url: ''
                    };
                }

                return objx;
            }));
        }));

        // Flatten the array of links
        const flattenedLinks = [].concat(...links); 

        if (flattenedLinks.length > 0) {
            res.status(200).send({
                is_error: false,
                data: flattenedLinks,
                message: "Posts retrieved successfully"
            });
        } else {
            res.status(404).send({
                is_error: true,
                data: null,
                message: "No posts found for the given post_type"
            });
        }

    } catch (error) {
         
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while retrieving posts"
        });
    }
})

postRouter.get("/post/get", middlewareTokens, async (req, res) => {
    
    try {
        
        const post_type = req.query.post_type;
        const post_id = req.query.post_id;
        const page_template = req.query.page_template;

        var query_object = {};
        if( post_type != undefined ) {
            query_object = { ...query_object, post_type: post_type };
        }

        if( page_template != undefined ) {
            query_object = { ...query_object, page_template: page_template };
        }

        if( post_id != undefined ) {
            query_object = { ...query_object, _id: post_id };
        }

        // Fetch posts based on the post_type
        const posts = await Posts.find(query_object);
        const settings = await Sets.find({});
        const users = await Usr.find({email: "moun2030@gmail.com"});
        const menus = await Menus.find({});

        var social_links = [];

        if(users.length) {
            var user = users[0];
            social_links = user.social_links?user.social_links: [] 
        }

        if (posts.length > 0) {
            res.status(200).send({
                is_error: false,
                data: posts,
                message: "Posts retrieved successfully",
                settings: settings,
                menus,
                social_links: social_links
            });
        } else {
            res.send({
                is_error: true,
                data: [],
                message: "No posts found for the given post_type",
                settings: settings,
                menus,
                social_links: social_links
            });
        }

    } catch (error) {
         
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while retrieving posts"
        });
    }
})



postRouter.get("/post/get-published", middlewareTokens, async (req, res) => {
    
    try {
        
        const post_type = req.query.post_type;
        const post_id = req.query.post_id;
        const page_template = req.query.page_template;

        var query_object = {};
        if( post_type != undefined ) {
            query_object = { ...query_object, post_type: post_type };
        }

        if( page_template != undefined ) {
            query_object = { ...query_object, page_template: page_template };
        }

        if( post_id != undefined ) {
            query_object = { ...query_object, _id: post_id };
        }

        query_object.is_published = true
        
        // Fetch posts based on the post_type
        const posts = await Posts.find(query_object);
        const settings = await Sets.find({});
        const users = await Usr.find({email: "moun2030@gmail.com"});
        const menus = await Menus.find({});

        var social_links = [];

        if(users.length) {
            var user = users[0];
            social_links = user.social_links?user.social_links: [] 
        }

        if (posts.length > 0) {
            res.status(200).send({
                is_error: false,
                data: posts,
                message: "Posts retrieved successfully",
                settings: settings,
                menus,
                social_links: social_links
            });
        } else {
            res.send({
                is_error: true,
                data: [],
                message: "No posts found for the given post_type",
                settings: settings,
                menus,
                social_links: social_links
            });
        }

    } catch (error) {
         
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while retrieving posts"
        });
    }
})


postRouter.get("/tutorials-page/get", middlewareTokens, async (req, res) => {
    
    try {
        
        const post_type = req.query.post_type;
        const post_id = req.query.post_id;
        const page_template = req.query.page_template;

        var query_object = {is_published: true};
        if( post_type != undefined ) {
            query_object = { ...query_object, post_type: post_type };
        }

        if( page_template != undefined ) {
            query_object = { ...query_object, page_template: page_template };
        }

        if( post_id != undefined ) {
            query_object = { ...query_object, _id: post_id };
        }

        // Fetch posts based on the post_type
        var menus = await Menus.find({});
        const posts = await Posts.find(query_object);
        const settings = await Sets.find({});
        const users = await Usr.find({email: "moun2030@gmail.com"});
        const tutorials = await Tutorial.find({"options.publish": true })
        const ads = await AdCampaign.find({page: 'tutorial_page', is_enabled: true });

        var social_links = [];

        if(users.length) {
            var user = users[0];
            social_links = user.social_links?user.social_links: [] 
        }

        if (posts.length > 0) {
            res.status(200).send({
                is_error: false,
                data: posts,
                menus: menus,
                message: "Posts retrieved successfully",
                settings: settings,
                social_links: social_links,
                tutorials: tutorials, 
                ads
            });
        } else {
            res.send({
                is_error: true,
                data: [],
                message: "No posts found for the given post_type",
                settings: settings,
                menus: menus,
                social_links: social_links,
                tutorials: tutorials,
                ads
            });
        }

    } catch (error) {
         
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while retrieving posts"
        });
    }
})



postRouter.get("/post-page/get", middlewareTokens, async (req, res) => {
   
    // post-page/get?tut_name=${tutorial_slug}&post_slug=${post_slug}
    try {
        
    
        if( ! req.query.tut_name || ! req.query.post_slug || ! req.query.tab ) {
            throw new Error("The page could not be found");   
        }

        var tutorial_slug = req.query.tut_name;
        var post_slug = req.query.post_slug;
        var tab_slug = req.query.tab;
         

        var tutorial = await Tutorial.findOne({slug: tutorial_slug}); 
        
        
        if( tutorial == null) {
            throw new Error("The page could not be found");  
        }
        
        

        // getting tab data
        var to_find = 'root'
        if( tab_slug != 'root') {
            var tab = tutorial.tabs.filter( x => x.slug == tab_slug ); 
            if( tab.length ) {
                tab = tab[0]; 
                to_find = tab._id.toString(); 
            }  
        }
         
        var post = await Posts.findOne({slug: post_slug, is_published: true, post_type: 0, 'tutorial.id': tutorial._id.toString() ,  'selected_tab._id': to_find});
         
        if(post == null ) {
            throw new Error("The page could not be found");  
        } 
        
        var posts = await Posts.find({post_type: 0, is_published: true, 'tutorial.id': tutorial._id.toString(), 'selected_tab._id': to_find });
        
        // add counter
        post.views = ( tutorial.views + 1 )
        await post.save();
    
        var chapters = await Chapters.find({'tutorial.id': tutorial._id.toString(), "tab._id": to_find });

        var menus = await Menus.find({})
        var ads = await AdCampaign.find({page: 'single_page', is_enabled: true});

        var settings = await Sets.find({})
        if(settings.length) {
            settings = settings[0]
        }
        
        var response = {
          tutorial,
          chapters,
          post,
          settings,
          posts,
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

});

// Delete a post by its post_id
postRouter.post("/post/delete", middlewareTokens, async (req, res) => {
    try {
        const postId = req.body.object_data.post_id;

        // Validate the post_id
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).send({
                is_error: true,
                data: null,
                message: "Invalid post_id"
            });
        }

        // Find and delete the post by its ID
        const deletedPost = await Posts.findByIdAndDelete(postId);

        if (deletedPost) {
            res.status(200).send({
                is_error: false,
                data: deletedPost,
                message: "Post deleted successfully"
            });
        } else {
            res.status(404).send({
                is_error: true,
                data: null,
                message: "Post not found"
            });
        }
    } catch (error) {
        res.status(500).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while deleting the post"
        });
    }
});

module.exports = { postRouter };
