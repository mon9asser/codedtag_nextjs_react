
import "@/app/globals.css";
import Head from "next/head";
import Image from "next/image";
import parse from 'html-react-parser' 
import { Helper } from "./../../services/helper";
import Header from "./../../parts/header";
import Footer from "./../../parts/footer"; 
import { ServerOffline } from "./../../services/components";
import { useRouter } from 'next/router';
import Link from "next/link";
/*import dynamic from "next/dynamic"; 
const AdCompaignBox = dynamic(() => import("./../../services/ad_campaign"), {
    ssr: false,
});*/
import AdCompaignBox from "./../../services/ad_campaign";
import {   
    GenerateTutorialContent_1,
    GenerateTutorialContent_2,
    SocialShare,
    FeedBackBlock
} from "./../../services/components"; 
import { notFound } from "next/navigation";
import Script from "next/script";


export default function Tutorials({upcoming}) {
    
    if(!upcoming) {
        return <ServerOffline/>
    }

    const header_content = parse(upcoming.settings.header)
    const footer_content = parse(upcoming.settings.footer)

    var TutorialHeader = () => {
        return (
            <header className="wrapper max-1150 offset-left offset-right">
                    <div className="row mlr--15">
                        <div className="md-9 text-center offset-left offset-right p-all-15 flexbox content-center column-direction tutorial-header-block"> 
                            
                            
                            <AdCompaignBox settings={upcoming.settings} data={upcoming.ads} position={'before_title'} />

                            <h1 className="tutorial-headline">
                                {Helper.decodeHtmlEntities(upcoming.tutorial?.tutorial_title)}
                            </h1>
                            
                             <AdCompaignBox settings={upcoming.settings} data={upcoming.ads} position={'after_title'} />
                            
                            <span className="sub-title">{upcoming.tutorial?.selected_category.name} </span>
                                
                            {
                                upcoming.tutorial?.tabs?.length ?
                                <>
                                    <ul className="no-list-style flexbox gap-50 content-center items-center flex-wrap bold-list tab-lang-categories">
                                        <li><Link href={`/tutorials/${upcoming.tutorial?.slug}/`}>Tutorials</Link></li>
                                        {upcoming.tutorial?.tabs.map(tb => <li key={tb._id}><Link href={tb?.slug.indexOf('http') == -1 ? `/tutorials/${upcoming.tutorial?.slug}/t/${tb?.slug}/`: tb?.slug }>{tb?.title}</Link></li>)}
                                    </ul>
                                     <AdCompaignBox settings={upcoming.settings} data={upcoming.ads} position={'after_tab_links'} />
                                </>
                                :""
                            } 

                            
                            <ul className="content-center no-list-style flexbox gap-50 items-center flex-wrap list-in-tuts">

                                <li>
                                    {<><span>{Helper.formatNumber(upcoming.posts?.length)}</span><span>Tutorials</span></>}
                                </li> 
                                <li> 
                                    {<><span>{Helper.formatNumber(upcoming.tutorial?.duration.split(" ")[0])}</span><span>{upcoming.tutorial?.duration.split(" ")[1]}</span></>}
                                </li> 

                                <li>
                                    {<><span>{upcoming.tutorial?.reviews}</span><span>Reviews</span></>}
                                </li>  

                                <li>
                                    {<><span>{Helper.formatNumber(upcoming.tutorial?.views)}</span><span>Views</span></>}
                                </li>   
                            </ul>
                            
                             <AdCompaignBox settings={upcoming.settings} data={upcoming.ads} position={'after_tutorial_statistics'} />
                             
                            <div className="mt-20 content-elem">
                                <GenerateTutorialContent_1 ad_camp={upcoming.ads} built_url={`${upcoming.site_url}tutorials/${upcoming.tutorial.slug}/`} upcoming={upcoming} data={upcoming.tutorial.description} />
                            </div>

                        </div>
                    </div>
            </header>
        );
    }

    
    var json_code_var = `
            {
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": "${upcoming.tutorial?.tutorial_title}",
                "author": {
                    "@type": "Organization",
                    "name": "${upcoming.settings?.site_name}"
                },
                "datePublished": "${upcoming.tutorial?.date_published}",   
                "dateModified": "${upcoming.tutorial?.date_updated}",   
                "description": "${upcoming.tutorial?.meta_description}",
                "publisher": {
                    "@type": "Organization",
                    "name": "${upcoming.settings?.site_name}",
                    "logo": {
                        "@type": "ImageObject",
                        "url": "${upcoming.settings?.site_logo}"  
                    }
                },
                "mainEntityOfPage": {
                    "@type": "WebPage",
                    "@id": "${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/"
                },
                "url": "${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/",
                "articleSection": "${upcoming.tutorial?.tag}",
                "keywords": "${upcoming.tutorial?.keyphrase}",
                "image": "${upcoming.tutorial?.thumbnail_url}",
                "breadcrumb": {
                        "@context": "https://schema.org",
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
                                "name": "Tutorials",
                                "item": "${upcoming.site_url}tutorials/"
                            },
                            {
                                "@type": "ListItem",
                                "position": 3,
                                "name": "${upcoming.tutorial?.tutorial_title}",
                                "item": "${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/"
                            }  
                        ]
                }
            }
        `
    var TutorialContentComponents = () => {
        return (
            <>
                

            <main className="wrapper max-1250 offset-left offset-right ptb-50">

                
                <TutorialHeader />
                
                {
                    upcoming.tutorial.content != '' ?
                    <div className="wrapper ptb-30-50 content-elem max-full text-center mlr--15 chapter-block-hlght">
                        <GenerateTutorialContent_2 ad_camp={upcoming.ads} built_url={`${upcoming.site_url}tutorials/${upcoming.tutorial.slug}/`} upcoming={upcoming} data={upcoming.tutorial.content} />
                    </div>: ''
                }  
                 
                <div className="wrapper max-800 text-center chapter-block-hlght box-vote-block"> 
                    <span>Share <b className='share-txt-on'>{upcoming.tutorial.tutorial_title}</b> on:</span>
                    <div className="flexbox gap-15 share-box"> 
                    <SocialShare   
                        platforms={upcoming.settings.share_social_buttons} 
                        url={`${upcoming.site_url}tutorials/${upcoming.tutorial.slug}/`}
                        title={upcoming.tutorial.meta_title}
                        size={32} 
                        height={'32px'} 
                        width={'32px'} 
                        radius={!upcoming.settings.circle_buttons} 
                    />
                    </div>
                </div>
                 
                <FeedBackBlock data_id={upcoming.tutorial._id} data_title={upcoming.tutorial.tutorial_title} feeadback_title="How Would You Like to Rate This Content?"/>

                
            </main> 
            </>
        );
    }
    
    return (
        <>
        <Head>
            <title>{upcoming.tutorial?.meta_title}</title>
            <meta name="description" content={upcoming.tutorial?.meta_description} />
            {
                upcoming.tutorial?.options?.hide_from_search_engines ?
                <meta name="robots" content={"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"} />
                : ""
            } 

            <link rel="canonical" href={`${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/`}/>
            <meta property="og:locale" content="en_US"/>
            <meta property="og:type" content="article"/>
            <meta property="og:title" content={upcoming.tutorial?.meta_title}/>
            <meta property="og:description" content={upcoming.tutorial?.meta_description}/>
            <meta property="og:url" content={`${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/`}/>
            <meta property="og:site_name" content={upcoming.settings.site_name}/> 

            
            <meta property="og:image" content={upcoming.tutorial?.thumbnail_url}/>
            <meta name="twitter:card" content="summary_large_image"/> 
            <meta name="twitter:image" content={upcoming.tutorial?.thumbnail_url}/>
            
            <script 
                type="application/ld+json" 
                dangerouslySetInnerHTML={{__html: json_code_var}}
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
            <TutorialContentComponents/>
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

        var tutorial_slug = context.params.tutorial;
        var request = await Helper.sendRequest({  
            api: `tutorial-page/get?tut_name=${tutorial_slug}&tab=root`,
            method: "get",
            data: {}
        })
        
        if (!request.ok) {
            throw new Error('Server is offline');
        }
    
        var upcoming = {};
        
        if( request.status == 200) {
            
            var json = await request.json();  
              
            if( json.is_error && !json.data.length ) { 
                return {
                    notFound: true
                }
            }

            var site_url = json.data.settings.site_address;
            if(site_url) {
                var url_array = site_url.split('/');
                if( url_array[url_array.length - 1] != '' ) {
                    site_url = site_url + '/';
                }
            } 
            json.data.settings.site_address = site_url;
             
            if( json.data.settings?.beside_post_title != "" && json.data.tutorial.options.enable_beside_title) {
                // json.data.settings?.beside_post_title
                if( json.data.tutorial?.meta_title) {
                    json.data.tutorial.meta_title = json.data.tutorial.meta_title + " " + json.data.settings?.beside_post_title;
                }
            }

            // prepare lists from menu 
            var nav_left = json.data.menus?.filter( x=> x.menu_name === "main_menu")
            var nav_right = json.data.menus?.filter( x=> x.menu_name === 'main_nav_right');
            var company_links = json.data.menus?.filter( x=> x.menu_name === "company_nav_links")
            var follow_links = json.data.menus?.filter( x=> x.menu_name === 'follow_nav_links');
            var nav_links = json.data.menus?.filter( x=> x.menu_name === 'tags_nav_links');

            upcoming = {
                tutorial: json.data.tutorial,
                posts: json.data.posts,
                chapters: json.data.chapters,
                settings: json.data.settings,
                ads: json.data.ads,
                menus: json.data.menus,
                is_redirect: json.redirect,
                nav_right,
                nav_left,
                company_links,
                follow_links,
                nav_links,
                site_url,
            }
        }

        return {
            props: {upcoming}
        }

    } catch (error) {
        context.res.statusCode = 500;
        return { props: { error: 'Server is offline, please try again later.' } };
    }

}