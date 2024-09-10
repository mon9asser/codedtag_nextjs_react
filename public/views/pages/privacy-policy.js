
import "@/app/globals.css";
import { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import parse from 'html-react-parser' 
import { Helper } from "./../services/helper";
import Header from "./../parts/header";
import Footer from "./../parts/footer";  
import Script from "next/script";
import { 
    ArticleContent,
    ServerOffline
} from "./../services/components";  
import { notFound } from "next/navigation";
import Config from "../services/config";


export default function PrivacyPolicy({upcoming}) {
     
    if( !upcoming ) return <ServerOffline/>

    var code_var_json = `
                        {
                            "@context": "https://schema.org",
                            "@type": "WebSite",
                            "url": "${upcoming.settings?.site_address}${upcoming.slug}/", 
                            "name": "${upcoming.meta_title}",
                            "description": "${upcoming.meta_description}",
                            "mainEntity": {
                                    "@type": "Organization",
                                    "name": "${upcoming.settings?.site_name}",
                                    "url": "${upcoming.settings?.site_address}",
                                    "description": "This privacy policy document outlines the types of personal information that is received and collected by ${upcoming.settings?.site_name} and how it is used.",
                                    "about": {
                                        "@type": "Thing",
                                        "name": "${upcoming.post_title}",
                                    },
                                    "creator": {
                                        "@type": "Organization",
                                        "name": "${upcoming.settings?.site_name}",
                                        "url": "${upcoming.settings?.site_address}",
                                    },
                                    "datePublished": "${upcoming.created_date}",
                                    "dateModified":  "${upcoming.updated_date}",
                            }
                        }
                        `;
    const header_content = parse(upcoming.settings.header)
    const footer_content = parse(upcoming.settings.footer)
    return (
        <>
            <Head>
                <title>{upcoming.meta_title}</title>
                <meta name="description" content={upcoming.meta_description} />
                {
                    upcoming.allow_search_engine? "" :
                    <meta name="robots" content={"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"} />
                }
                

                <link rel="canonical" href={`${upcoming.settings?.site_address}${upcoming.slug}/`}/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:type" content="article"/>
                <meta property="og:title" content={upcoming.meta_title}/>
                <meta property="og:description" content={upcoming.meta_description}/>
                <meta property="og:url" content={`${upcoming.settings?.site_address}${upcoming.slug}/`}/>
                <meta property="og:site_name" content={upcoming.settings.site_name}/>
                    
                <meta property="og:image" content={upcoming?.article_thumbnail_url}/>
                <meta name="twitter:card" content="summary_large_image"/> 
                <meta name="twitter:image" content={upcoming?.article_thumbnail_url}/>
                <script type="application/ld+json" dangerouslySetInnerHTML={{__html: code_var_json}}/>
                { header_content }
            </Head>
            <Header 
                settings={upcoming.settings}
                menus={{
                    nav_left: upcoming.nav_left, 
                    nav_right: upcoming.nav_right
                }}
            />
            <div className="max-850 offset-left offset-right mt-space-long plr-block"> 
                <header className="flexbox content-center column-direction mb-30">
                        
                    <h1 className="tutorial-headline mt-h">{Helper.decodeHtmlEntities(upcoming.post_title)}</h1>
                    <div className="flexbox items-center author-section mt-5"> 
                        <div className="flexbox content-center auth-name">
                            <i>Last Update: { Helper.formatDate(upcoming.updated_date)}</i>
                        </div>
                    </div>
                </header> 

                <div className="lg-2-content tutorial-content content-section">
                    <ArticleContent blocks={upcoming.blocks}/>
                </div> 

            </div>
            <Footer 
                settings={upcoming.settings}
                menus={{
                    company_links: upcoming.company_links,
                    follow_links: upcoming.follow_links,
                    nav_links: upcoming.nav_links, 
                }}
            />
            { footer_content }
        </>
    )
} 


export async function getServerSideProps(context) {

    var request = await Helper.sendRequest({
        api: "post/get?post_type=1&page_template=privacy_policy",
        method: "get",
        data: {} 
      })
       

      if (!request.ok) {
            throw new Error('Server is offline');
        }
        
      var upcoming = {}; 
      if( request.status == 200) {
    
        var json = await request.json(); 
        
        if( json.is_error ) {
            return {
                notFound: true 
            };
        }
        var this_page = json.data.length? json.data[0]: null; 
        var social_links = json.social_links || [];
        
        if( this_page == null ) {
            return {
                notFound: true 
            };
        }
        if(json.settings.length) {
            json.settings = json.settings[0];
        }

        var site_url = json.settings.site_address;
        if(site_url) {
            var url_array = site_url.split('/');
            if( url_array[url_array.length - 1] != '' ) {
                site_url = site_url + '/';
            }
        } 
        json.settings.site_address = site_url;

        var meta_title =this_page.meta_title + ' ' + json.settings.beside_post_title;
        
        // prepare lists from menu 
        var nav_left = json.menus?.filter( x=> x.menu_name === "main_menu")
        var nav_right = json.menus?.filter( x=> x.menu_name === 'main_nav_right');
        var company_links = json.menus?.filter( x=> x.menu_name === "company_nav_links")
        var follow_links = json.menus?.filter( x=> x.menu_name === 'follow_nav_links');
        var nav_links = json.menus?.filter( x=> x.menu_name === 'tags_nav_links');
        
        var paragraphs = this_page.blocks.filter(x => x.type == 'paragraph');

        upcoming = {
            article_thumbnail_url: this_page?.article_thumbnail_url, 
            menus: json.menus,                 
            blocks: this_page.blocks,
            article_thumbnail_url:  this_page.article_thumbnail_url,
            post_title: this_page.post_title, 
            meta_title: meta_title,  
            meta_description: this_page.meta_description, 
            allow_search_engine: this_page.allow_search_engine, 
            canonical_url: this_page.canonical_url, 
            created_date: this_page.created_date, 
            page_template: this_page.page_template, 
            slug: this_page.slug, 
            updated_date: this_page.updated_date, 
            settings: json.settings,
            social_links: social_links?.map(x => `"${x.social_link}"`), 
            nav_right,
            nav_left,
            company_links,
            follow_links,
            nav_links,
            site_url,
          };
      }
      
      return {
        props: {upcoming}
      }
    try {
        
    } catch (error) {
        context.res.statusCode = 500;
        return { props: { error: 'Server is offline, please try again later.' } };
    }
}

