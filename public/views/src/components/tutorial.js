
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

    const redirect404 = () => {
        navigate('/page-404');
    };

    // tutorial slug
    var params = useParams();
    var tutorial_slug = params.tut_slug;

    // states  df
    var [ upcoming, upcoming_change ] = React.useState({
        tutorial: null,
        posts: null,
        chapters: null,
        settings: null
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

            response_upcoming_callback({
                tutorial: row.data.tutorial,
                posts: row.data.posts,
                chapters: row.data.chapters,
                settings: null
            });
            
        }); 
        console.log(upcoming);
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


    var TutorialsList = () => {
        return ( 
           
            <div className="container white-grey-bg category-container">
                <span className="cats-number">01</span>
                <h2 className="category-headline">Introduction to UI/UX Design</h2>
                <ul className="tuts-categ">
                    <li>
                        <a>
                            <span>PHP Predefined Constants</span>
                            <span>2.5 Mins Read </span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>PHP Predefined Constants</span>
                            <span>2.5 Mins Read </span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>PHP Predefined Constants</span>
                            <span>2.5 Mins Read </span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>PHP Predefined Constants</span>
                            <span>2.5 Mins Read </span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <span>PHP Predefined Constants</span>
                            <span>2.5 Mins Read </span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <div>
                                <span>Latest News The Real News Network</span>
                                <div className="flexbox items-center post-auth-block"><img src="https://webdeveloper.com/wp-content/uploads/2022/05/ManoelaIlic_Portrait-46x50.jpg" alt="" srcSet="" /><span>Manoela Ilic </span></div>
                            </div>
                            <span>2.5 Mins Read </span>
                        </a>
                    </li>
                    <li>
                        <div className="div-block">
                            Ads block
                        </div>
                    </li>
                    <li>
                        <a>
                            <div>
                                <span>NBC News - Breaking News &amp; Top Stories</span>
                                <div className="flexbox items-center post-auth-block"><img src="https://webdeveloper.com/wp-content/uploads/2022/05/ManoelaIlic_Portrait-46x50.jpg" alt="" srcSet="" /><span>Manoela Ilic </span></div>
                            </div>
                            <span>2.5 Mins Read </span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <div>
                                <span>CNN: Breaking News, Latest News and Videos</span>
                                <div className="flexbox items-center post-auth-block"><img src="https://webdeveloper.com/wp-content/uploads/2022/05/ManoelaIlic_Portrait-46x50.jpg" alt="" srcSet="" /><span>Manoela Ilic </span></div>
                            </div>
                            <span>2.5 Mins Read </span>
                        </a>
                    </li>
                    <li>
                        <div className="div-block">
                            Ads block
                        </div>
                    </li>
                    <li>
                        <a>
                            <div>
                                <span>ABC News - Breaking News Latest News and Videos</span>
                                <div className="flexbox items-center post-auth-block"><img src="https://webdeveloper.com/wp-content/uploads/2022/05/ManoelaIlic_Portrait-46x50.jpg" alt="" srcSet="" /><span>Manoela Ilic </span></div>
                            </div>
                            <span>2.5 Mins Read </span>
                        </a>
                    </li>
                    <li>
                        <a>
                            <div>
                                <span>National Of Security Advisor Jake</span>
                                <div className="flexbox items-center post-auth-block"><img src="https://webdeveloper.com/wp-content/uploads/2022/05/ManoelaIlic_Portrait-46x50.jpg" alt="" srcSet="" /><span>Manoela Ilic </span></div>
                            </div>
                            <span>2.5 Mins Read </span>
                        </a>
                    </li>
                </ul>
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


                            <div className="div-block">
                                Ads block
                            </div>
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
                                    <div className="mt-20">
                                        <Helper.GenerateTutorialContent data={upcoming.tutorial.description} />
                                    </div>
                            }
                            
                            
                           
                            <div className="div-block">
                                Ads block
                            </div>
                        </div>
                    </div>
            </header>
        );
    }

    
    return (
        <>
            <Header/>
            <main className="wrapper max-1250 offset-left offset-right ptb-50">

                <div className="wrapper floating index-bottom">
                    <div className="circle floating-small left--15 top--25"></div>
                    <div className="circle floating-small right--15 bottom--25"></div>
                </div>

                <TutorialHeader />

                <div className="wrapper max-1250 offset-left offset-right ptb-50"> 
                    <div className="row mlr--10 tutorial-list-items"> 
                        <div className="md-4 p-all-10">
                            <TutorialsList/>
                        </div>
                        <div className="md-4 p-all-10">
                            <TutorialsList/>
                        </div>
                        <div className="md-12 p-all-10">
                            <div className="div-block">
                                Ads block
                            </div>
                        </div>
                        <div className="md-4 p-all-10">
                            <TutorialsList/>
                        </div>
                        <div className="md-4 p-all-10">
                            <TutorialsList/>
                        </div>
                    </div> 
                </div>

                <div className="div-block">
                    Ads block
                </div>
            </main>
            <Footer/>
        </>
    );
}

export { TurorialComponent };