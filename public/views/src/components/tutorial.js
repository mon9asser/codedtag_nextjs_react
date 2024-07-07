
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
  
  
var TurorialComponent = () => {

    const navigate = useNavigate();
    var feedback_form = React.useRef();

    const redirect404 = () => {
        navigate('/page-404');
    };

    // tutorial slug
    var params = useParams();
    var tutorial_slug = params.tut_slug;

    // states  df
    var [thumbs, thumbs_change] = React.useState(null);
    var [comment, comment_change] = React.useState('');

    var [ upcoming, upcoming_change ] = React.useState({
        tutorial: null,
        posts: null,
        chapters: null,
        settings: null,
        site_url: null
    });

    
    // Contexts 
    React.useEffect(() => {
         
        Helper.sendRequest({  
            api: `tutorial-page/get?tut_name=${tutorial_slug}`,
            method: "get",
            data: {}
        }).then( row => { 

            if(row.redirect) {
                redirect404();
                return;
            } 

            
            var site_url = row.data.settings.site_address;
            var url_array = site_url.split('/');
            if( url_array[url_array.length - 1] != '' ) {
                site_url = site_url + '/';
            }
            
            response_upcoming_callback({
                tutorial: row.data.tutorial,
                posts: row.data.posts,
                chapters: row.data.chapters,
                settings: row.data.settings,
                site_url
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

    var comments_feedback_callback = (obj) => {
        var old_objec = {...comments};
        var __keys = Object.keys(obj);
        __keys.map(x => {
            old_objec[x] = obj[x]
        }); 
        comments_change(old_objec);
    }
    
    var thumbUpHandler = ( e ) => {
        
        e.preventDefault();
  
        comments_feedback_callback({
            thumb: true
        });
       // var hldr = document.querySelector(".feedback-form-block");
        
    }

    var thumbDownHandler = ( e ) => {
        
        e.preventDefault();

        comments_feedback_callback({
            thumb: false
        });
    }


    var ThumbUp = () => (
        <svg height="25" width="25" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M320 1344q0-26-19-45t-45-19q-27 0-45.5 19t-18.5 45q0 27 18.5 45.5t45.5 18.5q26 0 45-18.5t19-45.5zm160-512v640q0 26-19 45t-45 19h-288q-26 0-45-19t-19-45v-640q0-26 19-45t45-19h288q26 0 45 19t19 45zm1184 0q0 86-55 149 15 44 15 76 3 76-43 137 17 56 0 117-15 57-54 94 9 112-49 181-64 76-197 78h-129q-66 0-144-15.5t-121.5-29-120.5-39.5q-123-43-158-44-26-1-45-19.5t-19-44.5v-641q0-25 18-43.5t43-20.5q24-2 76-59t101-121q68-87 101-120 18-18 31-48t17.5-48.5 13.5-60.5q7-39 12.5-61t19.5-52 34-50q19-19 45-19 46 0 82.5 10.5t60 26 40 40.5 24 45 12 50 5 45 .5 39q0 38-9.5 76t-19 60-27.5 56q-3 6-10 18t-11 22-8 24h277q78 0 135 57t57 135z"/></svg>
    )
    
    var ThumbDown = () => (
        <svg height="25" width="25" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M320 576q0 26-19 45t-45 19q-27 0-45.5-19t-18.5-45q0-27 18.5-45.5t45.5-18.5q26 0 45 18.5t19 45.5zm160 512v-640q0-26-19-45t-45-19h-288q-26 0-45 19t-19 45v640q0 26 19 45t45 19h288q26 0 45-19t19-45zm1129-149q55 61 55 149-1 78-57.5 135t-134.5 57h-277q4 14 8 24t11 22 10 18q18 37 27 57t19 58.5 10 76.5q0 24-.5 39t-5 45-12 50-24 45-40 40.5-60 26-82.5 10.5q-26 0-45-19-20-20-34-50t-19.5-52-12.5-61q-9-42-13.5-60.5t-17.5-48.5-31-48q-33-33-101-120-49-64-101-121t-76-59q-25-2-43-20.5t-18-43.5v-641q0-26 19-44.5t45-19.5q35-1 158-44 77-26 120.5-39.5t121.5-29 144-15.5h129q133 2 197 78 58 69 49 181 39 37 54 94 17 61 0 117 46 61 43 137 0 32-15 76z"/></svg>
    )
    
    var submit_feedback = (e) => {
        
        e.preventDefault();
        // assign title to form 

        comments_feedback_callback({title: upcoming.tutorial.tutorial_title})

        console.log(comments);
    }
    var FeedBackBlock = () => {

        return (
            <div className="feedback-block max-1050 update-sider">
                <div className="flexbox direction-row items-center space-between flex-wrap">
                    <div className="ptb-10">
                        <h3>Did you find this tutorial useful?</h3>
                        <p className="mt-8">Your feedback helps us improve our tutorials.</p>
                    </div>
                    <div className="flexbox direction-row gap-15 ptb-10">
                        <a href="#" className="x-thumb-up" onClick={thumbUpHandler}>
                            <ThumbUp/>
                        </a>

                        <a href="#" className="x-thumb-down" onClick={thumbDownHandler}>
                            <ThumbDown/>
                        </a>
                    </div>
                </div>
                <form className="feedback-form-block" ref={feedback_form}>
                    <textarea  
                        onChange={e => {
                            comments_change({
                                comment: e.target.value
                            })
                        }}
                        value={comments.comment}
                        placeholder="write your feedback here!"
                    ></textarea>
                    <button type="submit" onClick={submit_feedback} className="btn third-btn radius-5 custom-header-btn auto-left">Submit</button>
                </form>
            </div>
        );

    }

    var TutorialHeader = () => {
        return (
            <header className="wrapper max-1150 offset-left offset-right">
                    <div className="row mlr--15">
                        <div className="md-9 text-center offset-left offset-right p-all-15 flexbox content-center column-direction tutorial-header-block"> 
                            
                            <h1 className="tutorial-headline">
                                {
                                    upcoming.tutorial == null ?
                                    <Helper.PreLoader/>: upcoming.tutorial?.tutorial_title
                                } 
                            </h1>
                            
                            
                            <span className="sub-title">{upcoming.tutorial?.selected_category.name} </span>
                                
                            {
                                upcoming.tutorial?.tabs?.length ?
                                <ul className="no-list-style flexbox gap-50 content-center items-center flex-wrap bold-list tab-lang-categories">
                                    <li><Link to={`/tutorials/${upcoming.tutorial?.slug}/`}>Tutorials</Link></li>
                                    {upcoming.tutorial?.tabs.map(tb => <li key={tb._id}><Link to={tb?.slug.indexOf('http') == -1 ? `/tutorials/${upcoming.tutorial?.slug}/p/${tb?.slug}/`: tb?.slug }>{tb?.title}</Link></li>)}
                                </ul>
                                :""
                            } 
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
                            
                             
                            {
                                upcoming.tutorial == null ?
                                 <Helper.PreLoader type={'text'} lines={5}/>: 
                                    <div className="mt-20 content-elem">
                                        <Helper.GenerateTutorialContent built_url={`${upcoming.site_url}tutorials/${upcoming.tutorial.slug}/`} upcoming={upcoming} data={upcoming.tutorial.description} />
                                    </div>
                            } 

                        </div>
                    </div>
            </header>
        );
    }

    
    
    return (
        <>
            <Header/>
            <main className="wrapper max-1250 offset-left offset-right ptb-50">

                
                <TutorialHeader />
                
                {
                    upcoming.chapters == null ?
                        <div className="wrapper max-950 mt-20 mb-20"><Helper.PreLoader type={'text'} lines={3} columns={true}/></div> :
                        <>

                            {
                                upcoming.tutorial.content != '' ?
                                <div className="wrapper ptb-30-50 content-elem max-full text-center mlr--15 chapter-block-hlght">
                                    <Helper.GenerateTutorialContent built_url={`${upcoming.site_url}tutorials/${upcoming.tutorial.slug}/`} upcoming={upcoming} data={upcoming.tutorial.content} />
                                </div>: ''
                            }   

                        </> 
                }
                
                <FeedBackBlock/>    
                
                <div className="wrapper max-800 text-center chapter-block-hlght box-vote-block"> 
                     
                    {
                        
                        upcoming.settings == null ?
                        <Helper.PreLoader type={'text'} lines={1}/>
                        : (
                            upcoming.settings.share_social_buttons == '' ? ''
                            : 
                                <>
                                    <span>Share <b>{upcoming.tutorial.tutorial_title}</b> on:</span>
                                    <div className="flexbox gap-15 share-box"> 
                                    <Helper.SocialShare   
                                        platforms={upcoming.settings.share_social_buttons} 
                                        url={`${upcoming.site_url}tutorials/${upcoming.tutorial.slug}/`}
                                        title={upcoming.tutorial.meta_title}
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

                 

                
            </main>
            <Footer/>
        </>
    );
}

export { TurorialComponent };