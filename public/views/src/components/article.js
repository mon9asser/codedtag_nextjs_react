
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


var ArticleComponent = () => {

    const navigate = useNavigate(); 
    var location = useLocation();

     
    const redirect404 = () => {
        navigate('/page-404');
    };

    // tutorial slug
    var params = useParams();
    var post_slug = params.post_slug;
    var tutorial_slug = params.tut_slug;
    

    // Effect 
    React.useEffect(() => {
        
        Helper.sendRequest({  
            api: `post-page/get?tut_name=${tutorial_slug}&post_slug=${post_slug}`,
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

            upcoming_change({
                is_redirect: redirect,
                post: data.post, // object
                tutorial: data.tutorial, // object
                chapters: data.chapters, // array 
                settings: data.settings, // object
                posts: data.posts,
                site_url
            })
        });

    }, [location]);
   



    var [upcoming, upcoming_change] = React.useState({
        is_redirect: null,
        post: null, // object
        tutorial: null, // object
        chapters: null, // array 
        settings: null, // object
        posts: null,
        site_url: null,
    });

    
    
    // getting data 
    var ArticleComponents = () => {
         
        return (
            <main className="wrapper max-1150 offset-left offset-right ptb-50">
                    <div className="row mlr--15">
                        
                        {
                            upcoming.tutorial.options.sidebar_content != 'none' ?
                            <div className="md-4 md-1-half plr-15 main-sidebar flex-order-2-md">
                                <StickyBox offsetTop={85} offsetBottom={20}>
                                    
                                    
                                    {
                                        upcoming.tutorial.options.sidebar_content == 'chapters' && upcoming.chapters.length != 0 ?
                                        <Helper.ArticleSidebar site_url={upcoming.site_url} tutorial_slug={upcoming.tutorial.slug} type='chapters' data={upcoming.chapters} current_post_slug={upcoming.post.slug}/> 
                                        : <Helper.ArticleSidebar site_url={upcoming.site_url} tutorial_slug={upcoming.tutorial.slug} type='posts' data={upcoming.posts} current_post_slug={upcoming.post.slug}/> 
                                    }
                                    

                                </StickyBox>
                            </div> : ''
                        }
                        
                            
                        <div className={`plr-15 md-2-content main-content flex-order-1-md ${upcoming.tutorial.options.sidebar_content == 'none'?'md-9 auto-sides': 'md-8'}`}>
                            <div className="max-1150 offset-left offset-right">
                                 
                                <header className="flexbox content-center column-direction mb-30">
                                    
                                    <div className="flexbox items-center">
                                        <Helper.Breadcrumbs
                                            data={[
                                                {
                                                    title: upcoming.tutorial.selected_category.name,
                                                    url: upcoming.site_url + 'tutorials/',
                                                },
                                                {
                                                    title: upcoming.tutorial.tutorial_title,
                                                    url: upcoming.site_url + 'tutorials/' + upcoming.tutorial.slug + '/'
                                                }
                                            ]}
                                        /> 
                                    </div>

                                    <h1 className="tutorial-headline mt-h">{upcoming.post.post_title}</h1>
                                    <div className="flexbox items-center author-section mt-h">
                                        <div className="flexbox items-center author-thumb-section"> <a className="thumb" href="#"><img src="https://webdeveloper.com/wp-content/uploads/2022/05/ManoelaIlic_Portrait-46x50.jpg" width="35" height="35" alt="Author Name" /></a><a className="thumb" href="#">
                                            <img src="https://webdeveloper.com/wp-content/uploads/2022/09/erikdietrich-300x300.png" width="35" height="35" alt="Author Name" /></a>
                                        </div>
                                        <div className="flexbox content-center auth-name">
                                            <div className="flexbox items-center">Published By <a href="#">Isabella</a> and <a href="#">Montasser</a></div>
                                            <i>Last Update: 25 January, 2023</i>
                                        </div>
                                    </div>
                                </header> 

                                <div className="lg-2-content tutorial-content content-section">
                                    <Helper.ArticleContent blocks={upcoming.post.blocks}/>
                                </div>

                            </div> 
                            <div className="flexbox space-between pagination">
                                <a className="flexbox direction-row items-center hover-to-left" href="/godocs/site/style-4/our-features/mac/">
                                    <i className="left-arrow-pagin">
                                        
                                    </i>
                                    <span>
                                        <span className="d-none d-sm-block">Mac OS</span> 
                                        <span className="d-block d-sm-none">Prev</span> 
                                    </span>
                                </a>  
                                <a className="flexbox direction-row items-center hover-to-right" href="/godocs/site/style-4/our-features/ubuntu/">
                                    <span>
                                        <span className="d-none d-sm-block">Ubuntu</span> 
                                        <span className="d-block d-sm-none">Next</span>
                                    </span>
                                    <i className="right-arrow-pagin"></i>
                                </a>
                            </div>
                            <div className="separator-div"></div>
                            <Helper.FeedBackBlock data_id={''} data_title={''}/>
                        </div>

                    </div>

            </main> 
        )
    }
    return (
        <>
            <Header/>
                {
                    upcoming.post == null && upcoming.is_redirect == null ?
                    <Helper.PreLoader type={'article'} /> : (
                        upcoming.is_redirect ? <PageNotFound parts={false}/>: <ArticleComponents />
                    )
                    
                }
                
            <Footer/>
        </>
    );
}

export { ArticleComponent }