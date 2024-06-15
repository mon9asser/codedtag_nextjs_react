const mongoose = require('mongoose');
const express = require("express");
const { name, domain } = require("./../config/db");

var postRouter = express.Router();
var path = require("path");
var fs = require("fs");
const {Config} = require("./../config/options");
const {Helper} = require("./../config/helper")
const multer = require('multer');
const {Posts} = require("./../models/posts-model");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// Function to ensure directory exists
const ensureDirectoryExistence = (dirPath) => {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }
};

// Set up storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const now = new Date();
        const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        var build_folder = `${Config.uploads.folder}/${Config.uploads.serve}`
        const uploadPath = path.join(build_folder, year, month, day);
        ensureDirectoryExistence(uploadPath);
        
        req.upload_date = `${year}/${month}/${day}`;

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {

        var file_name = Helper.removeLastExtension(file.originalname); 
        var extension = Helper.getLastExtension(file.originalname);
        
        var randomizer = Math.floor(1000 + Math.random() * 9000);
        var new_file_name = `${file_name}-${randomizer}${extension}`;
        cb(null, new_file_name);
    }
});

// Initialize multer with storage engine
const upload = multer({ storage: storage });

postRouter.post("/upload-image", upload.single('image'), (req, res) => {
    
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    var fileUrl = `${Config.uploads.ip}/${Config.uploads.serve}/${req.upload_date}/${req.file.filename}`
     
    res.json({ success: 1, file: {url: fileUrl }  });

});
 

postRouter.post("/post/create-update", async (req, res) => {
    try {
        const body = req.body; 
        
        // Validate the request body
        if (!body || Object.keys(body).length === 0) {
            throw new Error("Invalid request body");
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



postRouter.post("/post/update-link", async (req, res) => {
     
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
                    console.log(x.data.content);

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

postRouter.get("/post-links/get", async (req, res) => {
    
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
        console.log(error.message);
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while retrieving posts"
        });
    }
})

postRouter.get("/post/get", async (req, res) => {
    
    try {
        const post_type = req.query.post_type;
         
        var query_object = {};
        if( post_type != undefined ) {
            query_object = { post_type: post_type };
        }

        // Fetch posts based on the post_type
        const posts = await Posts.find(query_object);

        if (posts.length > 0) {
            res.status(200).send({
                is_error: false,
                data: posts,
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
        console.log(error.message);
        res.status(400).send({
            is_error: true,
            data: null,
            message: error.message || "An error occurred while retrieving posts"
        });
    }
})

module.exports = { postRouter };
