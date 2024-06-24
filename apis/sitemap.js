const express = require("express");  
var sitemapRouter = express.Router(); 
const mongoose = require('mongoose');
var path = require("path");
var fs = require("fs");

const { site_url } = require("./../config/db")
const {Config} = require("./../config/options")
// database models 
const {Usr} = require("./../models/user-model");
const {Tutorial} = require("./../models/tutorial-model");
const {Posts} = require("./../models/posts-model");

/**
 * main sitemap => sitemap_index.xml
 * posts sitemap => sitemap_articles.xml
 * pages sitemap => sitemap_pages.xml
 * users sitemap => sitemap_users.xml
 * tutorials sitemap => sitemap_tutorials.xml
 * tutorial tabs sitemap => sitemap_tutorial_tabs.xml
 * 
 */

// 1- Posts  
// 2- Pages
// 3- users
// 4- Tutorials
// 5- Tutorial Tabs



sitemapRouter.get("/sitemap_articles.xml", async (req, res) => {
    try {
        var posts = await Posts.find({ post_type: 0, is_published: true, allow_search_engine: true });

        var posts_data = posts.map(post => {
            return `
                <url>
                    <loc>${site_url}${Config.redirect_to}${ (post.tutorial.slug == ""? "" : "/" + post.tutorial.slug) + "/" + post.slug}</loc>
                    <lastmod>${new Date(post.updated_date).toISOString()}</lastmod>
                    <changefreq>weekly</changefreq>
                    <priority>0.8</priority>
                </url>
            `;
        }).join("");

        var sitemap = `
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${posts_data}
            </urlset>
        `;

        res.header("Content-Type", "application/xml");
        res.send(sitemap.trim());

    } catch (err) {
        res.status(500).send("An error occurred while generating the sitemap.");
    }
});



// Main sitemap 
sitemapRouter.get("/sitemap_index.xml", async (req, res) => {

    try {

        var posts = await Posts.find({post_type: 0, is_published: true, allow_search_engine: true});
        
        res.send(posts)

    } catch {
        res.send("")
    } 
})


module.exports = { sitemapRouter }