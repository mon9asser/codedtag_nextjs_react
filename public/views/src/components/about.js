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

var AboutPage = () => {

    // states  
    var [ upcoming, upcoming_change ] = React.useState({
        blocks: [], 
        post_title: 'About Us', 
        meta_title: 'About Us', 
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
                settings: settings
            };
            
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
                            "url": "${upcoming.settings?.site_address}/${upcoming.slug}/",
                            "name": "${upcoming.meta_title}",
                            "description": "${upcoming.meta_description}"
                            "mainEntity": {
                                "@type": "Organization",
                                "name": "الصباغ للمعلوميات",
                                "url": "${upcoming.settings?.site_address}",
                                "logo": {
                                "@type": "ImageObject",
                                "url": "https://codedtag.com/logo.png",
                                    "width": 250,
                                    "height": 250
                                },
                                "contactPoint": {
                                    "@type": "ContactPoint",
                                    "contactType": "Customer Support", 
                                    "email": "contact@codedtag.com",
                                    "url": "https://codedtag.com/contact-us"
                                },
                                "founder": {
                                    "@type": "Person",
                                    "name": "Montasser Mossallem"
                                },
                                "foundingDate": "2022-06-26",
                                "sameAs": [
                                    "https://www.facebook.com/YourFacebookPage",
                                    "https://www.twitter.com/YourTwitterHandle",
                                    "https://www.linkedin.com/company/YourCompanyName"
                                ]
                            }
                            
                        }
                        `
                    }
                </script>
            </Helmet>

            <Header/>
            
            <div className="max-850 offset-left offset-right mt-space-long plr-block"> 
                <header className="flexbox content-center column-direction mb-30">
                        
                    <h1 className="tutorial-headline mt-h">PHP Variable Functions</h1>
                    <div className="flexbox items-center author-section mt-5"> 
                        <div className="flexbox content-center auth-name">
                                <i>Last Update: 25 January, 2023</i>
                        </div>
                    </div>
                </header> 

                <div className="lg-2-content tutorial-content content-section">
                    
                    <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                    </p>
                     
                    <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                    </p>
                    <blockquote>
                        <p>Learn and read how to Install Node.js on Windows and write your first</p>
                        <cite> Montasser Mossallem </cite>
                    </blockquote>
                    <h2>Learn and read how to Install Node.js on Windows and write your first program</h2>
                    <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                    </p>
                    <h3>Learn and read how to Install Node.js on Windows and write your first program</h3>
                    <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                    </p>
                    <h4>Learn and read how to Install Node.js on Windows and write your first program</h4>
                    <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                    </p>
                    <h5>Learn and read how to Install Node.js on Windows and write your first program</h5>
                    <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                    </p>
                    <h6>Learn and read how to Install Node.js on Windows and write your first program</h6>
                    <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                    </p>
                    <iframe width="420" height="315" src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
                    <figure> 
                        <LazyLoadImage
                            className="half"
                            alt={'Alt of image'}
                            height={'auto'}
                            src="https://www.freecodecamp.org/news/content/images/size/w1000/2020/02/clem-onojeghuo-gBnHMsAOWrs-unsplash.jpg" // use normal <img> attributes as props
                            width={'auto'} /> 
                    </figure>
                    <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                    </p> 
                    <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                    </p>
                     
                    <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                    </p> 
                    <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                    </p>
                </div>

            </div>
            <Footer/>
        </>
    );
}
 

export { AboutPage }