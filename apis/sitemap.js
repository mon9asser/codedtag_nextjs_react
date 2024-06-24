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
// 4- tutorials
// 5- Tutorial Tabs


var sitemaps = {
    articles: '/sitemap_articles.xml',
    pages: '/sitemap_pages.xml',
    users: '/sitemap_users.xml',
    tutorials: '/sitemap_tutorials.xml',
    tabs: '/sitemap_tabs.xml',
}

sitemapRouter.get( sitemaps.articles, async (req, res) => {
    try {
        var posts = await Posts.find({ post_type: 0, is_published: true, allow_search_engine: true });
        
        var posts_data = posts.map(post => {
            if ( post.tutorial.slug != undefined && post.updated_date != undefined && post.slug != undefined ) {
                return `
                    <url>
                        <loc>${site_url}${Config.redirect_to}${ (post.tutorial.slug == "" ? "" : "/" + post.tutorial.slug) + "/" + post.slug}</loc>
                        <lastmod>${new Date(post.updated_date).toISOString()}</lastmod>
                        <changefreq>weekly</changefreq>
                        <priority>0.8</priority>
                    </url>
                `;
            } return ""
            
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


sitemapRouter.get( sitemaps.pages, async (req, res) => {
    try {
        var posts = await Posts.find({ post_type: 1, is_published: true, allow_search_engine: true });
         
        var posts_data = posts.map(post => {
            if (  post.updated_date != undefined && post.slug != undefined ) {
                return `
                    <url>
                        <loc>${site_url}${ "/" + post.slug}</loc>
                        <lastmod>${new Date(post.updated_date).toISOString()}</lastmod>
                        <changefreq>weekly</changefreq>
                        <priority>0.8</priority>
                    </url>
                `;
            } return ""
            
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


sitemapRouter.get( sitemaps.users, async (req, res) => {
    
    try {
        var users = await Usr.find({ allow_appears_in_search_engine: true, is_blocked: false });

        var users_data = users.map(user => {
            if (user.username != undefined && user.username != "") {
                return `
                    <url>
                        <loc>${site_url}/users/${user.username}</loc>
                        <changefreq>monthly</changefreq>
                        <priority>0.7</priority>
                    </url>
                `;
            }
            return "";
        }).join("");

        var sitemap = `
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${users_data}
            </urlset>
        `;

        res.header("Content-Type", "application/xml");
        res.send(sitemap.trim());

    } catch (err) {
        res.status(500).send("An error occurred while generating the sitemap.");
    }
});

sitemapRouter.get( sitemaps.tutorials, async (req, res) => {
    
    try {
        var tutorials = await Tutorial.find({ "options.publish": true });
         
        var tutorial_data =tutorials.map(tuts => {
            if (tuts.slug != undefined && tuts.slug != "" && tuts.options.publish) {
                return `
                    <url>
                        <loc>${site_url}${Config.redirect_to}/${tuts.slug}</loc>
                        <changefreq>monthly</changefreq>
                        <priority>0.7</priority>
                    </url>
                `;
            }
            return "";
        }).join("");

        var sitemap = `
            <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                ${tutorial_data}
            </urlset>
        `;

        res.header("Content-Type", "application/xml");
        res.send(sitemap.trim());

    } catch (err) {
        res.status(500).send("An error occurred while generating the sitemap.");
    }
});

sitemapRouter.get( sitemaps.tabs, async (req, res) => {
    
    var tutorials = await Tutorial.find({ "options.publish": true });
    var tabs = tutorials.map(tutorial => tutorial.tabs).flat();

     
    res.send(tabs)

});

// Main sitemap 
sitemapRouter.get("/sitemap_index.xml", async (req, res) => {

    try {

        var posts = await Posts.find({post_type: 0, is_published: true, allow_search_engine: true});
        var pages = await Posts.find({ post_type: 1, is_published: true, allow_search_engine: true });
        var users = await Usr.find({ allow_appears_in_search_engine: true, is_blocked: false });
        var tutorials = await Tutorial.find({ "options.publish": true });

        res.send(posts)

    } catch {
        res.send("")
    } 
})


module.exports = { sitemapRouter }