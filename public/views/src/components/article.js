
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
    var [expandor_checkbox, expandor_checkbox_change] = React.useState(false);

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

    }, []);
   

    var contentTableToggler = () => { 
        expandor_checkbox_change(!expandor_checkbox);
    }

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
                                        <Helper.ArticleSidebar site_url={upcoming.site_url} tutorial_slug={upcoming.tutorial.slug} type='chapters' data={upcoming.chapters}/> 
                                        : <Helper.ArticleSidebar site_url={upcoming.site_url} tutorial_slug={upcoming.tutorial.slug} type='posts' data={upcoming.posts}/> 
                                    }
                                    

                                </StickyBox>
                            </div> : ''
                        }
                        
                            
                        <div className={`plr-15 md-2-content main-content flex-order-1-md ${upcoming.tutorial.options.sidebar_content == 'none'?'md-9 auto-sides': 'md-8'}`}>
                            <div className="max-1150 offset-left offset-right">
                                 
                                <header className="flexbox content-center column-direction mb-30">
                                    <div className="flexbox items-center">
                                        <ul className="breadcrumbs">
                                            <li>
                                                <a className="sub-title" href="#">Programming</a>  
                                            </li>
                                            <li>
                                                <a className="sub-title" href="#">PHP</a>  
                                            </li>
                                            <li> 
                                                <span className="">Data Format and Types</span> 
                                            </li>
                                        </ul>
                                    </div>
                                    <h1 className="tutorial-headline mt-h">PHP Variable Functions</h1>
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
                                    
                                    <p>
                                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                                    </p>
                                    {/* Table Of Content */}
                                    <input checked={expandor_checkbox} onChange={e => null} id="tbl-block-collapser-expander" type="checkbox" className="hide" />
                                    <div className="content-tble-mobile-block">
                                        <ul className="block-list custom-aside-tuts list-items">
                                            <li className="has-slideitem" style={{background: "#f9f9f9"}}>
                                                <a href="#">Table of Content</a>
                                                <ul className="slideitem" style={{display: "block"}}>
                                                    <li><a href="#">Pages</a></li>
                                                    <li><a href="#">Blocks</a></li>
                                                    <li><a href="#">Headers</a></li>
                                                    <li><a href="#">Footers</a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                        <label className={"tble-content-handler expander" + (( expandor_checkbox )? " collapser": "")} onClick={contentTableToggler}></label>
                                    </div>
                                    
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
                                    
                                    
                                    <div className="hljs code-block"> 
                                        <div className="code-header flexbox items-center space-between">
                                            <BrowserIcon/>
                                            <div className="flexbox items-center gap-10">
                                                <a className="hljs btn-highlighted">
                                                    <CopyIcon checked={false}/>
                                                </a>
                                            </div>
                                        </div>

                                        <Highlight className='javascript'> 
                                        {`var data = 'Hello world';\nvar data = 'Hello world';`}
                                        </Highlight>

                                        <div className="code-footer flexbox items-center space-between">
                                            <a href="#" className="btn flexbox gap-5 go-to-compiler-button">
                                                <span>Try it yourself</span>
                                            </a>
                                        </div>

                                    </div>

                                    <p>
                                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                                    </p>
                                     
                                    <p>
                                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available. Wikipedia
                                    </p>
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