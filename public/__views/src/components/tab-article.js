
import React, { Component } from "react";
import { Header } from "../parts/header"; 
import { Footer } from "../parts/footer";
import { Link } from "react-router-dom";
import withNavigation from "../utils/with-navigation";
import { useParams, useNavigate, useLocation  } from 'react-router-dom';
import { Helper } from "../helper";
import { Helmet } from "react-helmet";
import { Settings } from "../settings"; 
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Highlight from 'react-highlight'
import StickyBox from "react-sticky-box";
import { PageNotFound } from './404'

var BrowserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="54" height="14" viewBox="0 0 54 14"><g fill="none" fillRule="evenodd" transform="translate(1 1)"><circle cx="6" cy="6" r="6" fill="#FF5F56" stroke="#E0443E" strokeWidth=".5"></circle><circle cx="26" cy="6" r="6" fill="#FFBD2E" stroke="#DEA123" strokeWidth=".5"></circle><circle cx="46" cy="6" r="6" fill="#27C93F" stroke="#1AAB29" strokeWidth=".5"></circle></g></svg>
);

var CopyIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{width: '24px', height: '24px'}}>
        <path style={{display: props.checked ? "block": "none" }} className="with-check" strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
        <path style={{display: !props.checked ? "block": "none" }} className="without-check" strokeLinecap="round" strokeLinejoin="round" d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v8.25A2.25 2.25 0 006 16.5h2.25m8.25-8.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-7.5A2.25 2.25 0 018.25 18v-1.5m8.25-8.25h-6a2.25 2.25 0 00-2.25 2.25v6"></path>
    </svg>
);


var TabArticleComponent = () => {

    const navigate = useNavigate(); 
    var location = useLocation();

     
    const redirect404 = () => {
        navigate('/page-404');
    };

    // tutorial slug
    var params = useParams();
    var post_slug = params.post_slug;
    var tutorial_slug = params.tut_slug;
    var tab_slug = params.tab_slug;

    // Effect 
    React.useEffect(() => {
        
        Helper.sendRequest({  
            api: `post-page/get?tut_name=${tutorial_slug}&post_slug=${post_slug}&tab=${tab_slug}`,
            method: "get",
            data: {}
        }).then( row => { 
            var {data, redirect, is_error} = row 
            
            // working with site_url 
            var site_url = row.data?.settings?.site_address;
            if(site_url) {
                var url_array = site_url.split('/');
                if( url_array[url_array.length - 1] != '' ) {
                    site_url = site_url + '/';
                }
            }
            var tab = null;
            if( data.tutorial?.tabs && data.tutorial.tabs.length ) {
                var tab = data.tutorial.tabs.filter( x => x.slug == tab_slug );
                if( tab.length ) {
                    tab = tab[0]
                }
            }

            // assign beside title 
            if( data.settings?.beside_post_title != "") {
                // row.data.settings?.beside_post_title
                if( data.post?.meta_title) {
                    data.post.meta_title = data.post.meta_title + " " + row.data.settings?.beside_post_title;
                }
            }
             
            upcoming_change({
                is_redirect: redirect,
                post: data.post, // object
                tutorial: data.tutorial, // object
                chapters: data.chapters, // array 
                settings: data.settings, // object
                menus: data.menus,
                posts: data.posts,
                site_url,
                tab,
                ads: data.ads
            })
        });

    }, [location]);
   



    var [upcoming, upcoming_change] = React.useState({
        is_redirect: null,
        post: null, // object
        tutorial: null, // object
        chapters: null, // array 
        settings: null, // object
        menus: null, // object
        posts: null,
        site_url: null,
        tab: null,
        ads: null
    });

    
    
    // getting data 
    var TabArticleComponents = () => {
         
        var image = upcoming.post.blocks.filter(x => x.type == 'image');
        if( image.length == 0) {
            image = ''
        } else {
            image = image[0].data.file.url 
        }

        
         
        return (
            <>
                <Helmet>
                     
                    <title>{upcoming.post?.meta_title}</title>
                    <meta name="description" content={upcoming.post?.meta_description} />
                    {
                        upcoming.post?.allow_search_engine == false ?
                        <meta name="robots" content={"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"} />
                        : ""
                    }
                    
                    <script type="application/ld+json">
                    {
                        `
                            {
                                "@context": "https://schema.org",
                                "@type": "Article",
                                "headline": "${upcoming.post?.post_title}",   
                                "author": {
                                    "@type": "Organization",
                                    "name": "${upcoming.settings?.site_name}"  
                                },
                                "datePublished": "${upcoming.post?.created_date}",  
                                "dateModified": "${upcoming.post?.updated_date}",   
                                "description": "${upcoming.post?.meta_description}",   
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
                                    "@id": "${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/t/${upcoming.tab?.slug}/${upcoming.post?.slug}/"   
                                },
                                "url": "${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/t/${upcoming.tab?.slug}/${upcoming.post?.slug}/",  
                                "articleSection": "${upcoming.tutorial?.tag}",   
                                "keywords": "${upcoming.post?.keyphrase}",  
                                "image": "${image}",  
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
                                        },
                                        {
                                            "@type": "ListItem",
                                            "position": 4,
                                            "name": "${upcoming.tab?.title}",
                                            "item": "${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/t/${upcoming.tab?.slug}/"
                                        },
                                        {
                                            "@type": "ListItem",
                                            "position": 5,
                                            "name": "${upcoming.post?.post_title}",
                                            "item": "${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/t/${upcoming.tab?.slug}/${upcoming.post?.slug}/"
                                        }
                                    ]
                                }
                                }
                        `
                    }
                    </script> 

                    <link rel="canonical" href={`${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/t/${upcoming.tab?.slug}/${upcoming.post?.slug}/`}/>
                    <meta property="og:locale" content="en_US"/>
                    <meta property="og:type" content="article"/>
                    <meta property="og:title" content={upcoming.post?.meta_title}/>
                    <meta property="og:description" content={upcoming.post?.meta_description}/>
                    <meta property="og:url" content={`${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/t/${upcoming.tab?.slug}/${upcoming.post?.slug}/`}/>
                    <meta property="og:site_name" content={upcoming.settings.site_name}/>

                    <meta property="og:image" content={upcoming.post?.article_thumbnail_url}/>
                    <meta name="twitter:card" content="summary_large_image"/> 
                    <meta name="twitter:image" content={upcoming.post?.article_thumbnail_url}/>
                </Helmet>

                <main className="wrapper max-1150 offset-left offset-right ptb-50">
                        <div className="row mlr--20">
                         
                            {
                                upcoming.tab.sidebar_content != 'none' ?
                                <div className="md-4 md-1-half plr-20 main-sidebar flex-order-2-md">

                                    <StickyBox offsetTop={85} offsetBottom={20}>
                                        
                                        <Helper.AdCompaignBox data={upcoming.ads} position={'before_sidebar'} />

                                        {
                                            upcoming.tab.sidebar_content == 'chapters' && upcoming.chapters.length != 0 ?
                                            <Helper.ArticleSidebar helper={{ads: upcoming.ads, settings: upcoming.settings}} site_url={upcoming.site_url} tutorial_slug={upcoming.tutorial.slug} type='chapters' data={upcoming.chapters} current_post_slug={upcoming.post.slug} tab_slug={upcoming.tab.slug}/> 
                                            : <Helper.ArticleSidebar helper={{ads: upcoming.ads, settings: upcoming.settings}} site_url={upcoming.site_url} tutorial_slug={upcoming.tutorial.slug} type='posts' data={upcoming.posts} current_post_slug={upcoming.post.slug} tab_slug={upcoming.tab.slug}/> 
                                        }
                                        

                                    </StickyBox>
                                </div> : ''
                            }
                            
                                
                            <div className={`plr-20 md-2-content main-content flex-order-1-md ${upcoming.tutorial.options.sidebar_content == 'none'?'md-9 auto-sides': 'md-8'}`}>
                                <div className="max-1150 offset-left offset-right">
                                    
                                    <Helper.AdCompaignBox data={upcoming.ads} position={'before_title'}/>

                                    <header className="flexbox content-center column-direction mb-30">
                                        <h1 className="tutorial-headline mt-h">{upcoming.post.post_title}</h1>
                                        <i className="modified-date">
                                        Last updated on <time dateTime={Helper.formated_published_date(upcoming.post.updated_date).value}>{Helper.formated_published_date(upcoming.post.updated_date).text}</time>
                                        </i>
                                    </header> 

                                    <Helper.AdCompaignBox data={upcoming.ads} position={'after_title'}/>

                                    <div className="lg-2-content tutorial-content content-section">
                                        <Helper.ArticleContentSingle helper={{ads: upcoming.ads, settings: upcoming.settings}} blocks={upcoming.post.blocks}/>
                                    </div>

                                </div> 

                                {
                                    upcoming.posts?.length > 1 ? 
                                    (
                                        <>
                                            <div className="separator-div"></div> 
                                            {
                                                upcoming.tutorial.options.sidebar_content == 'chapters' && upcoming.chapters.length != 0 ?
                                                <Helper.NextPrevPagination site_url={upcoming.site_url} tutorial_slug={upcoming.tutorial.slug} type='chapters' data={upcoming.chapters} current_post_slug={upcoming.post.slug}/>
                                                : <Helper.NextPrevPagination site_url={upcoming.site_url} tutorial_slug={upcoming.tutorial.slug} type='posts' data={upcoming.posts} current_post_slug={upcoming.post.slug}/> 
                                            } 
                                            <div className="separator-div"></div>
                                        </>
                                    ): ""
                                }
                                

                                
                                <div className="wrapper max-800 text-center chapter-block-hlght box-vote-block"> 
                                    {
                                        upcoming.settings.share_social_buttons == '' ? ''
                                        : 
                                        <>
                                            <span>Share <b className='share-txt-on'>{upcoming.post.post_title}</b> on:</span>
                                            <div className="flexbox gap-15 share-box"> 
                                            <Helper.SocialShare   
                                                platforms={upcoming.settings.share_social_buttons} 
                                                url={`${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/t/${upcoming.tab?.slug}/${upcoming.post?.slug}/`}
                                                title={upcoming.post.meta_title}
                                                size={32} 
                                                height={'32px'} 
                                                width={'32px'} 
                                                radius={!upcoming.settings.circle_buttons} 
                                            />
                                            </div>
                                        </>
                                    }
                                </div>
                                <Helper.AdCompaignBox data={upcoming.ads} position={`after_contents`}/>
                                <Helper.FeedBackBlock data_id={upcoming.post._id} data_title={upcoming.post.post_title}/>
                            </div>

                        </div>

                </main> 
            </>
        )
    }



    return (
        <>
            <Header menus={upcoming.menus} settings={upcoming.settings}/> 
                {
                    upcoming.post == null && upcoming.is_redirect == null ?
                    <Helper.PreLoader type={'article'} /> : (
                        upcoming.is_redirect ? <PageNotFound parts={false}/>: <TabArticleComponents />
                    )
                    
                }
            <Footer menus={upcoming.menus} settings={upcoming.settings}/> 
        </>
    );
}

export { TabArticleComponent }