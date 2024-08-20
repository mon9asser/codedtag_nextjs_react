
import React, { Component } from "react";
import { Header } from "../parts/header"; 
import { Footer } from "../parts/footer";
import { Link } from "react-router-dom";
import withNavigation from "../utils/with-navigation";
import { useParams, useNavigate  } from 'react-router-dom';
import { Helper } from "../helper";
import { Helmet } from "react-helmet";
import { Settings } from "../settings"; 
import { LazyLoadImage } from 'react-lazy-load-image-component';

import {PageNotFound} from './404'
  
var TabComponent = () => {

    const navigate = useNavigate(); 

    const redirect404 = () => {
        navigate('/page-404');
    };

    // tutorial slug
    var params = useParams();
    var tutorial_slug = params.tut_slug;
    var tab_slug = params.tab_slug;
    
    var [ upcoming, upcoming_change ] = React.useState({
        tutorial: null,
        posts: null,
        chapters: null,
        settings: null,
        site_url: null,
        is_redirect: null,
        tab: null,
        menus: null,
        ads: null
    });

    
    // Contexts 
    React.useEffect(() => {
        
        Helper.sendRequest({  
            api: `tutorial-page/get?tut_name=${tutorial_slug}&tab=${tab_slug}`,
            method: "get",
            data: {}
        }).then( row => { 

             
            var site_url = row.data?.settings?.site_address;
            if(site_url) {
                var url_array = site_url.split('/');
                if( url_array[url_array.length - 1] != '' ) {
                    site_url = site_url + '/';
                }
            }
            
            
            
            // target tab
            var tab = null; 
            var target_tab = row.data?.tutorial?.tabs?.filter(x => x.slug == tab_slug )
            if(target_tab?.length) {
                tab = target_tab[0];
            }
            
            // assign beside title 
            if( row.data.settings?.beside_post_title != "") {
                // row.data.settings?.beside_post_title
                if( tab?.meta_title) {
                    tab.meta_title = tab.meta_title + " " + row.data.settings?.beside_post_title;
                }
            }
            
            if( row.data.tutorial?.options ) {
                var opts = { ...row.data.tutorial?.options };
                row.data.tutorial.options = {
                    ...opts, ...tab
                }
            } 

            response_upcoming_callback({
                ads: row.data.ads,
                tab: tab,
                tutorial: row.data.tutorial,
                posts: row.data.posts,
                chapters: row.data.chapters,
                settings: row.data.settings,
                site_url,
                menus: row.data.menus,
                is_redirect: row.redirect
            });
            
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
    

    var TutorialHeader = () => {
         

        return (
            <header className="wrapper max-1150 offset-left offset-right">
                    <div className="row mlr--15">
                        <div className="md-9 text-center offset-left offset-right p-all-15 flexbox content-center column-direction tutorial-header-block"> 
                            
                            <Helper.AdCompaignBox data={upcoming.ads} position={'before_title'}/>

                            <h1 className="tutorial-headline">
                                {
                                    upcoming.tab == null ?
                                    <Helper.PreLoader/>: upcoming.tab?.title
                                } 
                            </h1>
                            
                            <Helper.AdCompaignBox data={upcoming.ads} position={'after_title'}/>
                            
                            <span className="sub-title">{upcoming.tutorial?.selected_category.name} </span>
                                
                            {
                                upcoming.tutorial?.tabs?.length ?
                                <ul className="no-list-style flexbox gap-50 content-center items-center flex-wrap bold-list tab-lang-categories">
                                    <li><Link to={`/tutorials/${upcoming.tutorial?.slug}/`}>Tutorials</Link></li>
                                    {upcoming.tutorial?.tabs.map(tb => <li key={tb._id}><Link to={tb?.slug.indexOf('http') == -1 ? `/tutorials/${upcoming.tutorial?.slug}/t/${tb?.slug}/`: tb?.slug }>{tb?.title}</Link></li>)}
                                </ul>
                                :""
                            } 

                            <Helper.AdCompaignBox data={upcoming.ads} position={'after_tab_links'}/>

                            <ul className="content-center no-list-style flexbox gap-50 items-center flex-wrap list-in-tuts">

                                <li>
                                    {
                                       upcoming.posts == null ?
                                        <Helper.PreLoader/>
                                        : <><span>{Helper.formatNumber(upcoming.posts?.length)}</span><span>Tutorials</span></>
                                    }
                                </li> 
                                <li> 
                                    {
                                        upcoming.tutorial == null ?  <Helper.PreLoader/>
                                        : <><span>{Helper.formatNumber(upcoming.tutorial?.duration.split(" ")[0])}</span><span>{upcoming.tutorial?.duration.split(" ")[1]}</span></>
                                    }
                                </li> 

                                <li>
                                    {
                                       upcoming.posts == null ?
                                        <Helper.PreLoader/>
                                        : <><span>{upcoming.tutorial?.reviews}</span><span>Reviews</span></>
                                    }
                                </li>  

                                <li>
                                    {
                                       upcoming.posts == null ?
                                        <Helper.PreLoader/>
                                        : <><span>{Helper.formatNumber(upcoming.tutorial?.views)}</span><span>Views</span></>
                                    }
                                </li>   
                            </ul>
                            
                            <Helper.AdCompaignBox data={upcoming.ads} position={'after_tutorial_statistics'}/>

                            {
                                upcoming.tutorial == null ?
                                 <Helper.PreLoader type={'text'} lines={5}/>: 
                                    <div className="mt-20 content-elem">
                                        <Helper.GenerateTutorialContent_tab ad_camp={upcoming.ads} built_url={`${upcoming.site_url}tutorials/${upcoming.tutorial.slug}/t/${upcoming.tab.slug}/`} upcoming={upcoming} data={upcoming.tab.description} />
                                    </div>
                            } 

                        </div>
                    </div>
            </header>
        );
    }

    
    var TutorialContentComponents = () => {
        return (
            <>
                <Helmet>
                    <title>{upcoming.tab?.meta_title}</title>
                    <meta name="description" content={upcoming.tab?.meta_description} />
                    {
                        upcoming.tab?.hide_from_search_engines ?
                        <meta name="robots" content={"noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex"} />
                        : ""
                    } 
                    <script type="application/ld+json">
                    {
                        `
                            {
                                "@context": "https://schema.org",
                                "@type": "Article",
                                "headline": "${upcoming.tab?.title}",
                                "author": {
                                    "@type": "Organization",
                                    "name": "${upcoming.settings?.site_name}"
                                },
                                "datePublished": "${upcoming.tutorial?.date_published}",   
                                "dateModified": "${upcoming.tutorial?.date_updated}",   
                                "description": "${upcoming.tab?.meta_description}",
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
                                    "@id": "${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/t/${upcoming.tab?.slug}/",
                                },
                                "url": "${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/t/${upcoming.tab?.slug}",
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
                                            },
                                            {
                                                "@type": "ListItem",
                                                "position": 4,
                                                "name": "${upcoming.tab?.title}",
                                                "item": "${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/t/${upcoming.tab?.slug}/"
                                            }, 
                                        ]
                                }
                            }
                        `
                    }
                    </script> 


                <link rel="canonical" href={`${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/t/${upcoming.tab?.slug}/`}/>
                <meta property="og:locale" content="en_US"/>
                <meta property="og:type" content="article"/>
                <meta property="og:title" content={upcoming.tab?.meta_title}/>
                <meta property="og:description" content={upcoming.tab?.meta_description}/>
                <meta property="og:url" content={`${upcoming.site_url}tutorials/${upcoming.tutorial?.slug}/t/${upcoming.tab?.slug}/`}/>
                <meta property="og:site_name" content={upcoming.settings.site_name}/> 

                 
                <meta property="og:image" content={upcoming.tutorial?.thumbnail_url}/>
                <meta name="twitter:card" content="summary_large_image"/> 
                <meta name="twitter:image" content={upcoming.tutorial?.thumbnail_url}/>
            </Helmet>
 

            <main className="wrapper max-1250 offset-left offset-right ptb-50">

                
                <TutorialHeader />
                 
                
                <div className="wrapper max-800 text-center chapter-block-hlght box-vote-block"> 
                     
                    {
                        
                        upcoming.settings == null ?
                        <Helper.PreLoader type={'text'} lines={1}/>
                        : (
                            upcoming.settings.share_social_buttons == '' ? ''
                            : 
                                <>
                                    <span>Share <b className='share-txt-on'>{upcoming.tab.title}</b> on:</span>
                                    <div className="flexbox gap-15 share-box"> 
                                    <Helper.SocialShare   
                                        platforms={upcoming.settings.share_social_buttons} 
                                        url={`${upcoming.site_url}tutorials/${upcoming.tutorial.slug}/t/${upcoming.tab.slug}/`}
                                        title={upcoming.tab.meta_title}
                                        size={32} 
                                        height={'32px'} 
                                        width={'32px'} 
                                        radius={!upcoming.settings.circle_buttons} 
                                    />
                                    </div>
                                </>
                        )
                    }                    
                </div>

                {
                    upcoming.tutorial == null ? 
                    <Helper.PreLoader type={'text'} columns={true} is_full={true} lines={1}/>
                    : <Helper.FeedBackBlock data_id={upcoming.tab._id} data_title={upcoming.tab.title} feeadback_title="How Would You Like to Rate This Content?"/>  
                }

                
            </main> 
            </>
        );
    }
    
    return (
        <>
            <Header menus={upcoming.menus} settings={upcoming.settings}/>
                {
                    upcoming.post == null && upcoming.is_redirect == null ?
                    <Helper.PreLoader type={'article'} /> : (
                        upcoming.is_redirect ? <PageNotFound parts={false}/>: <TutorialContentComponents/>
                    )
                    
                }
            <Footer menus={upcoming.menus} settings={upcoming.settings}/> 
        </>       
    );
}

export { TabComponent };