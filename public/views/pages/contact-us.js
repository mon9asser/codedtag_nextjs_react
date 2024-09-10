
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
    TutorialsContent,
    ServerOffline
} from "./../services/components"; 
import ReCAPTCHA from "react-google-recaptcha"; 
import { notFound } from "next/navigation";
import Config from "../services/config";

export default function Contact ({upcoming}) {
     
    if(!upcoming) {
        return <ServerOffline/>
    }
    
    var code_json_var = `
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
                        `;
    var [captcha, changed_capatch] = useState(null);
    var [response_result, response_res_change] = useState({
        cls: '',
        text: '',
        is_pressed: false
    });
    const header_content = parse(upcoming.settings.header)
    const footer_content = parse(upcoming.settings.footer)
    var recaptchaRef = useRef("")
    var handleCaptchaReset = () => {

        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }

        changed_capatch(null);
    };
    var response_res_change_callback = (obj) => {
        var old_objec = {...response_result};
        var __keys = Object.keys(obj);
        __keys.map(x => {
            old_objec[x] = obj[x]
        }); 
        response_res_change(old_objec);
    }
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
    
    var [form_object, change_form_object] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    var apply_object_change = (obj) => {
        var old_objec = {...form_object};
        var __key = Object.keys(obj)[0];
        old_objec[__key] = obj[__key];
        change_form_object(old_objec);
    }

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
                <script type="application/ld+json" dangerouslySetInnerHTML={{__html: code_json_var}} />
                { header_content }
            </Head>

            <Header 
                settings={upcoming.settings}
                menus={{
                    nav_left: upcoming.nav_left, 
                    nav_right: upcoming.nav_right
                }}
            />
            <div className="container ptb-50">

                <div className="wrapper max-960 offset-left offset-right mt-20 mb-10">
                    <header className="container-col-75">
                        <h1 className="headline">{Helper.decodeHtmlEntities(upcoming.post_title)}</h1>
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
                            sitekey={Config.captcha.public}
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
        api: "post/get?post_type=1&page_template=contact_page",
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
            paragraphs: paragraphs.length? paragraphs: [{ data: { text: 'Greetings! If you have any questions or suggestions regarding our tutorials or products, please use the form below to send us a message. We will respond as soon as we can. Have a great day! 🙂' }}],
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

