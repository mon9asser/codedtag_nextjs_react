
import "@/app/globals.css";
import Head from "next/head";
import Image from "next/image";
import parse from 'html-react-parser' 
import { Helper } from "./../services/helper";
import Header from "./../parts/header";
import Footer from "./../parts/footer"; 
import { ServerOffline } from "./../services/components";
import Script from "next/script";
import { 
    TutorialsContent
} from "./../services/components"; 


export default function Tutorials({upcoming}) {
    
    if(!upcoming) {
        return <ServerOffline/>
    }

    var jsonLdContent = `
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
                <script
                    type="application/ld+json" 
                    dangerouslySetInnerHTML={{ __html: jsonLdContent }}
                />
                {header_content}  
            </Head>
            <Header 
                settings={upcoming.settings}
                menus={{
                    nav_left: upcoming.nav_left, 
                    nav_right: upcoming.nav_right
                }}
            />
            <div className="max-850 offset-left offset-right mt-space-long plr-block ptb-60"> 
                <header className="flexbox content-center column-direction mb-30">
                    <h1 className="tutorial-headline mt-h">{Helper.decodeHtmlEntities(upcoming.post_title)}</h1>
                    <div className="flexbox items-center author-section mt-5"> 
                        <div className="flexbox content-center auth-name">
                            <i>Last Update: { Helper.formatDate(upcoming.updated_date)}</i>
                        </div>
                    </div>
                </header> 
                <div className="lg-2-content tutorial-content content-section">
                    <TutorialsContent settings={upcoming.settings} ad_camp={upcoming.ads} blocks={upcoming.blocks} tutorials={upcoming.tutorials}/>
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

            {footer_content}
        </>
    );
}

export async function getServerSideProps(context) {

    try {
        var request = await Helper.sendRequest({
            api: "tutorials-page/get?post_type=1&page_template=all_tutorials_by_categories",
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
            var all_tutorials = json.tutorials.filter( x => x.selected_category != null )
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
            
            upcoming = {
                ads: json.ads,
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
                tutorials: all_tutorials,
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
    } catch (error) {
        context.res.statusCode = 500;
        return { props: { error: 'Server is offline, please try again later.' } };
    }
}