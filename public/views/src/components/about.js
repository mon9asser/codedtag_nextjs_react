import React, { Component } from "react";
import { Header } from "../parts/header"; 
import { Footer } from "../parts/footer";
import { Link } from "react-router-dom";
import withNavigation from "../utils/with-navigation";
import { Helper } from "../helper";
import { Helmet } from "react-helmet";
import { Settings } from "../settings";
import ReCAPTCHA from "react-google-recaptcha"; 


var AboutPage = () => {

    // states 
    var [captcha, changed_capatch] = React.useState(null);
    var [response_result, response_res_change] = React.useState({
        cls: '',
        text: '',
        is_pressed: false
    });

     

    var [ upcoming, upcoming_change ] = React.useState({
        paragraphs: [{ data: { text: 'Greetings! If you have any questions or suggestions regarding our tutorials or products, please use the form below to send us a message. We will respond as soon as we can. Have a great day! 🙂' }}], 
        post_title: 'Contact Us', 
        meta_title: 'Contact Us', 
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
        }
    });
    
    // refs 
    var recaptchaRef = React.useRef("")

    // Contexts 
    React.useEffect(() => {
        
        Helper.sendRequest({
            api: "post/get?post_type=1&page_template=about_page",
            method: "get",
            data: {}
        }).then( row => {
            
            var this_page = row.data.length? row.data[0]: {}; 
            var settings = row?.settings?.length ? row.settings[0]: null;
             
            var paragraphs = this_page?.blocks?.filter(x => x.type == 'paragraph') || [];
            var object_to_change = {
                paragraphs: paragraphs.length ? paragraphs: upcoming.paragraphs, 
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
                settings: settings
            };
            
            response_upcoming_callback(object_to_change);

        });

    }, []);
    
    // functions
    var response_res_change_callback = (obj) => {
        var old_objec = {...response_result};
        var __keys = Object.keys(obj);
        __keys.map(x => {
            old_objec[x] = obj[x]
        }); 
        response_res_change(old_objec);
    }

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
                            "@type": "ContactPage",
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": "${upcoming.settings?.site_address}/${upcoming.slug}/"
                            },
                            "url": "${upcoming.settings?.site_address}/${upcoming.slug}/",
                            "name": "${upcoming.meta_title}",
                            "description": "${upcoming.meta_description}"
                        }
                        `
                    }
                </script>
            </Helmet>

            <Header/>
            <div className="container ptb-50">

                <div className="wrapper max-960 offset-left offset-right mt-20 mb-10">
                    <header className="container-col-75">
                        <h1 className="headline">{upcoming.post_title}</h1>
                    </header>
                </div>

                <div className="wrapper max-960 offset-left offset-right">
                    <p>lorem ipsume dummy text!</p>
                </div>

            </div>
            <Footer/>
        </>
    );
}
 

export { AboutPage }