
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
        posts: [],
        chapters: [],
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

            console.log(row);

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


    var TutorialsList = () => {
        return ( 
           
            <div className="container white-grey-bg category-container">
                <span className="cats-number">01</span>
                <h2 className="category-headline">Introduction to UI/UX Design</h2>
                <ul className="tuts-categ">
                    <li>
                        <a>
                            <div>
                                <span>PHP Predefined Constants</span>
                                <div className="flexbox items-center post-auth-block"><img src="https://webdeveloper.com/wp-content/uploads/2022/05/ManoelaIlic_Portrait-46x50.jpg" alt="" srcSet="" /><span>Manoela Ilic </span></div>
                            </div>
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
                            
                            <h1 className="tutorial-headline">PHP Tutorials </h1><span className="sub-title">Programming Language </span>
                            <div className="div-block">
                                Ads block
                            </div>
                            <ul className="no-list-style flexbox gap-50 content-center items-center flex-wrap bold-list tab-lang-categories">
                                <li><a href="#">Tutorials</a></li>
                                <li><a href="#">References</a></li>
                                <li><a href="#">Examples</a></li>
                                <li><a href="#">PHP Compiler</a></li>
                            </ul>
                            <div className="div-block">
                                Ads block
                            </div>
                            <p className="tutorial-description text-center">Hello! Do you have any question or suggestion about this site, or just want to say Hi? Send me a message using below form. I will get back to you as soon as possible.</p>
                            <ul className="content-center no-list-style flexbox gap-50 items-center flex-wrap list-in-tuts">
                                <li> <span>150k</span><span>Total Tutorials</span></li>
                                <li> <span>150.0</span><span>Minutes</span></li>
                                <li> <span>4.8</span><span>Reviews</span></li>
                                <li> <span>5.0K</span><span>Views</span></li>
                            </ul>
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
            <main className="wrapper max-1150 offset-left offset-right ptb-50">

                <div className="wrapper floating index-bottom">
                    <div className="circle floating-small left--15 top--25"></div>
                    <div className="circle floating-small right--15 bottom--25"></div>
                </div>

                <TutorialHeader />

                <div className="wrapper max-960 offset-left offset-right ptb-50"> 
                    <div className="row mlr--10 tutorial-list-items"> 
                        <div className="md-6 p-all-10">
                            <TutorialsList/>
                        </div>
                        <div className="md-6 p-all-10">
                            <TutorialsList/>
                        </div>
                        <div className="md-12 p-all-10">
                            <div className="div-block">
                                Ads block
                            </div>
                        </div>
                        <div className="md-6 p-all-10">
                            <TutorialsList/>
                        </div>
                        <div className="md-6 p-all-10">
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