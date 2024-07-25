import React, { Component } from "react";
import { Header } from "../parts/header"; 
import { Footer } from "../parts/footer";
import { Link } from "react-router-dom";
import withNavigation from "../utils/with-navigation";
import { Helper } from "../helper";
import { Helmet } from "react-helmet";
import { Settings } from "../settings";
import ReCAPTCHA from "react-google-recaptcha"; 


var ContactPage = () => {

    // states 
    var [captcha, changed_capatch] = React.useState(null);
    var [response_result, response_res_change] = React.useState({
        cls: '',
        text: '',
        is_pressed: false
    });

    var [form_object, change_form_object] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: '',
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
        },
        menus: null
    });
    
    // refs 
    var recaptchaRef = React.useRef("")

    // Contexts 
    React.useEffect(() => {
        
        Helper.sendRequest({
            api: "post/get?post_type=1&page_template=contact_page",
            method: "get",
            data: {}
        }).then( row => {
            
            var this_page = row.data.length? row.data[0]: {}; 
            var settings = row?.settings?.length ? row.settings[0]: null;
            

            var paragraphs = this_page?.blocks?.filter(x => x.type == 'paragraph') || [];
            var object_to_change = {
                article_thumbnail_url: this_page?.article_thumbnail_url,
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
                settings: settings,
                menus: row?.menus
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
    var apply_object_change = (obj) => {
        var old_objec = {...form_object};
        var __key = Object.keys(obj)[0];
        old_objec[__key] = obj[__key];
        change_form_object(old_objec);
    }

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

    var handleCaptchaReset = () => {

        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }

        changed_capatch(null);
    };

    var submit_form = async (e) => {
        
        e.preventDefault();
        response_res_change_callback({
            is_pressed: true,
            cls: '',
            text: '',
        });

        if(response_result.is_pressed) {
            return;
        }

        if(captcha == null ) {
            response_res_change_callback({
                is_pressed: false,
                cls: 'show-msg error',
                text: 'Confirm that you are not robot!',
            });

            return;
        }

        var email_validator = Helper.validateEmail(form_object.email);
        if( !email_validator ) {
  
            response_res_change_callback({
                is_pressed: false, 
                cls: 'show-msg error',
                text: 'Email is not valid!', 
            });

            return; 

        }

        if( form_object.email == '' || form_object.full_name == "" || form_object.subject == '' || form_object.message == '' ) {
  
            response_res_change_callback({
                is_pressed: false, 
                cls: 'show-msg error',
                text: 'All fileds are required !', 
            });

            return; 

        }

        var res = await Helper.sendRequest({ api: "contact-message", method: "post", data: form_object })
 
        if( res.is_error) {
            
            response_res_change_callback({
                is_pressed: false, 
                cls: 'show-msg error',
                text: res.message, 
            });

            return;
        } 

        // success 
        response_res_change_callback({
            is_pressed: false, 
            cls: 'show-msg success',
            text: "Thank you for reaching out to us. We will get back to you within a few days.", 
        });

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
                                "@id": "${upcoming.settings?.site_address}${upcoming.slug}/"
                            },
                            "url": "${upcoming.settings?.site_address}${upcoming.slug}/",
                            "name": "${upcoming.meta_title}",
                            "description": "${upcoming.meta_description}"
                        }
                        `
                    }
                </script>
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
            </Helmet>

            <Header menus={upcoming.menus} settings={upcoming.settings}/> 
            <div className="container ptb-50">

                <div className="wrapper max-960 offset-left offset-right mt-20 mb-10">
                    <header className="container-col-75">
                        <h1 className="headline">{upcoming.post_title}</h1>
                    </header>
                </div>

                <div className="wrapper max-960 offset-left offset-right">

                    <form className="container-col-75 content content-section" action="">
                        
                        
                        { upcoming.paragraphs.map((x, k) => <p key={k}>{x.data.text}</p> ) }

                        <input value={form_object.name} onChange={(e) => apply_object_change({name: e.target.value})} className="full-border grey-border mb-20" type="text" placeholder="Full Name"/>
                        <input value={form_object.email} onChange={(e) => apply_object_change({email: e.target.value})} className="full-border grey-border mb-20" type="text" placeholder="Email"/>
                        <input value={form_object.subject} onChange={(e) => apply_object_change({subject: e.target.value})} className="full-border grey-border mb-20" type="text" placeholder="Subject"/>
                        <textarea value={form_object.message} onChange={(e) => apply_object_change({message: e.target.value})} className="full-border grey-border mb-20" name="" cols="15" rows="5" aria-invalid="false" placeholder="Message"></textarea>
                        
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={Settings.google.captcha.public}
                            onChange={changed_capatch} 
                            onReset={handleCaptchaReset}
                        />

                        <div className={`response-msg ${response_result.cls}`}>{response_result.text}</div>

                        <div className="flexbox items-center">
                            <button onClick={submit_form} className="btn primary-btn third-btn btn-fit" type="submit" id="submit-contact-form">
                                {
                                    response_result.is_pressed ? 
                                    <span className="loader"></span> :
                                    'Send Message'
                                }
                            </button>
                        </div>
                    </form>
                    
                </div>

            </div>
            <Footer menus={upcoming.menus} settings={upcoming.settings}/>
        </>
    );
}

export { ContactPage };