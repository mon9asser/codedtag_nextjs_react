import React, { Component } from "react";
import { Header } from "../parts/header"; 
import { Footer } from "../parts/footer";
import { Link } from "react-router-dom";
import withNavigation from "../utils/with-navigation";
import { Helper } from "../helper";
import { Helmet } from "react-helmet";
import { Settings } from "../settings";
import ReCAPTCHA from "react-google-recaptcha"; 
import { LazyLoadImage } from 'react-lazy-load-image-component';









var TutorialsComponent = () => {
    
    var [ upcoming, upcoming_change ] = React.useState({
        blocks: null, 
        post_title: null, 
        meta_title: null, 
        description: null,
        meta_description: '',
        allow_search_engine: false,
        canonical_url: null,
        created_date: null,
        updated_date: null, 
        page_template: null, 
        slug: null,  
        menus: null,
        settings: null,
        social_links: [],
        tutorials: null,
        article_thumbnail_url: '',
        ads: null
    });
    

    // functions  
    var response_upcoming_callback = (obj) => {
        var old_objec = {...upcoming};
        var __keys = Object.keys(obj);
        __keys.map(x => {
            old_objec[x] = obj[x]
        }); 
        upcoming_change(old_objec);
    } 

    // Contexts 
    React.useEffect(() => {
       
        Helper.sendRequest({  
            api: `tutorials-page/get?post_type=1&page_template=all_tutorials_by_categories`,
            method: "get",
            data: {}
        }).then( row => { 
             
            var this_page = row.data.length? row.data[0]: {}; 
            var settings = row?.settings?.length ? row.settings[0]: null;
            var social_links = row?.social_links || [];
            
            var all_tutorials = row.tutorials?.filter( x => x.selected_category != null )
            
            var site_url = settings?.site_address;
            if(site_url) {
                var url_array = site_url.split('/');
                if( url_array[url_array.length - 1] != '' ) {
                    site_url = site_url + '/';
                }
            } 

            response_upcoming_callback({
                site_url,
                ads: row.ads,
                menus: row.menus,
                blocks: this_page?.blocks,
                article_thumbnail_url:  this_page?.article_thumbnail_url,
                post_title: this_page.post_title ? this_page.post_title: upcoming.post_title, 
                meta_title: this_page.meta_title ? (this_page.meta_title + ( settings?.beside_post_title ? " "+ settings.beside_post_title: "" ) ): upcoming.meta_title + ( settings?.beside_post_title ? " "+ settings.beside_post_title: "" ), 
                description: this_page.description ? this_page.description: upcoming.description, 
                meta_description: this_page.meta_description ? this_page.meta_description: upcoming.meta_description, 
                allow_search_engine: this_page.allow_search_engine ? this_page.allow_search_engine: upcoming.allow_search_engine, 
                canonical_url: this_page.canonical_url ? this_page.canonical_url: upcoming.canonical_url, 
                created_date: this_page.created_date ? this_page.created_date: upcoming.created_date, 
                page_template: this_page.page_template ? this_page.page_template: upcoming.page_template, 
                slug: this_page.slug ? this_page.slug: upcoming.slug, 
                updated_date: this_page.updated_date ? this_page.updated_date: upcoming.updated_date, 
                settings: settings,
                social_links: social_links?.map(x => `"${x.social_link}"`),
                tutorials: all_tutorials 
            });
            
            
        });  

    }, []);

    var TutorialspageComponentsParts = () => {
        
        return (
            <>
                <Helmet>
                    <title>{upcoming.meta_title}</title>
                    <meta name="description" content={upcoming.meta_description} />
                    {
                        upcoming.allow_search_engine? "" :
                        <meta name="robots" content={"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"} />
                    }
                    <script type="application/ld+json">
                        {
                            `
                                {
                                    "@context": "https://schema.org",
                                    "@type": "WebPage",
                                    "name": "${upcoming.post_title}",
                                    "description": "${upcoming.meta_description}",
                                    "url": "${upcoming.site_url}tutorials/",
                                    "breadcrumb": {
                                        "@type": "BreadcrumbList",
                                        "itemListElement": [
                                            {
                                                "@type": "ListItem",
                                                "position": 1,
                                                "name": "Home",
                                                "item": "${upcoming.site_url}"
                                            },
                                            {
                                                "@type": "ListItem",
                                                "position": 2,
                                                "name": "${upcoming.post_title}",
                                                "item": "${upcoming.site_url}tutorials/"
                                            }
                                        ]
                                    }
                                }
                            `
                        }
                    </script>

                    <link rel="canonical" href={`${upcoming.site_url}tutorials/`}/>
                    <meta property="og:locale" content="en_US"/>
                    <meta property="og:type" content="article"/>
                    <meta property="og:title" content={upcoming.meta_title}/>
                    <meta property="og:description" content={upcoming.meta_description}/>
                    <meta property="og:url" content={`${upcoming.site_url}tutorials/`}/>
                    <meta property="og:site_name" content={upcoming.settings.site_name}/> 

                    
                    <meta property="og:image" content={upcoming.article_thumbnail_url}/>
                    <meta name="twitter:card" content="summary_large_image"/> 
                    <meta name="twitter:image" content={upcoming.article_thumbnail_url}/>
                        
                </Helmet> 
                
                <div className="max-1050 offset-left offset-right mt-space-long plr-block ptb-60"> 
                    <header className="flexbox content-center column-direction mb-30">
                        <h1 className="tutorial-headline mt-h">{upcoming.post_title}</h1>
                        <div className="flexbox items-center author-section mt-5"> 
                            <div className="flexbox content-center auth-name">
                                <i>Last Update: { Helper.formatDate(upcoming.updated_date)}</i>
                            </div>
                        </div>
                    </header> 
                    <div className="lg-2-content tutorial-content content-section">
                        <Helper.TutorialsContent ad_camp={upcoming.ads} blocks={upcoming.blocks} tutorials={upcoming.tutorials}/>
                    </div> 
                </div>
            </>
        );
    }
    
    return (
        
        <>
            <Header menus={upcoming.menus} settings={upcoming.settings}/> 
            { 
                upcoming.blocks == null || upcoming.post_title == null || upcoming.settings == null ? 
                <Helper.PreLoader type={'article'} /> :
                <TutorialspageComponentsParts />
            } 
            <Footer menus={upcoming.menus} settings={upcoming.settings}/> 
            
        </>       
    );

}


export { TutorialsComponent };