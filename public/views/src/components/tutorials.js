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


    // states  df
    var [ upcoming, upcoming_change ] = React.useState({
        blocks: [], 
        post_title: 'Tutorials', 
        meta_title: 'Tutorials', 
        description: '',
        meta_description: '',
        allow_search_engine: false,
        canonical_url: '',
        created_date: '',
        updated_date: '', 
        page_template: '', 
        slug: '',  
        settings: {
            site_address: ''
        },
        social_links: [],
        tutorials: []
    });
    
    // refs 
    var recaptchaRef = React.useRef("")

    // Contexts 
    React.useEffect(() => {
         
        Helper.sendRequest({  
            api: "tutorials-page/get?post_type=1&page_template=all_tutorials_by_categories",
            method: "get",
            data: {}
        }).then( row => {
            
            var this_page = row.data.length? row.data[0]: {}; 
            var settings = row?.settings?.length ? row.settings[0]: null;
            var social_links = row?.social_links || [];
            
            var all_tutorials = row.tutorials?.filter( x => x.selected_category != null )
           

            var object_to_change = {
                blocks: this_page?.blocks, 
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
            };
             

            var site_url = object_to_change.settings?.site_address;
            var last_char = site_url?.length ? site_url[site_url.length - 1]: "";
            if(last_char != "/" && last_char != "") {
                object_to_change.settings.site_address = object_to_change.settings?.site_address + "/";
            }
            
            response_upcoming_callback(object_to_change);

        });

    }, []);
    
    // functions 

    var response_upcoming_callback = (obj) => {
        var old_objec = {...upcoming};
        var __keys = Object.keys(obj);
        __keys.map(x => {
            old_objec[x] = obj[x]
        }); 
        upcoming_change(old_objec);
    }


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
                                "name": "Tutorials",
                                "description": "A collection of tutorials on programming, computer science, system engineering, and more.",
                                "url": "https://codedtag.com/tutorials/",
                                "breadcrumb": {
                                    "@type": "BreadcrumbList",
                                    "itemListElement": [
                                        {
                                            "@type": "ListItem",
                                            "position": 1,
                                            "name": "Home",
                                            "item": "https://codedtag.com/"
                                        },
                                        {
                                            "@type": "ListItem",
                                            "position": 2,
                                            "name": "Tutorials",
                                            "item": "https://codedtag.com/tutorials/"
                                        }
                                    ]
                                }
                            }
                        `
                    }
                </script>
            </Helmet> 
            <Header/>
                <div className="max-1050 offset-left offset-right mt-space-long plr-block"> 
                     
                    <div className="lg-2-content tutorial-content content-section">
                        <Helper.TutorialsContent blocks={upcoming.blocks} tutorials={upcoming.tutorials}/>
                    </div> 
                </div>
            <Footer/>
        </>
    );
}


export { TutorialsComponent };