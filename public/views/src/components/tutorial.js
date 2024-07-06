
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


    var TutorialsList = ({ index, data, chapter_title }) => {
        
        return ( 
           
            <div className="container white-grey-bg category-container update-chpt">
                 
                 {
                    chapter_title != undefined ?
                    <>
                        <span className="cats-number">{Helper.produceNumber(index)}</span>
                        <h2 className="category-headline">{chapter_title}</h2>
                    </> : ""
                 }
                 
                 <div className="chapter-cont">
                    <ul className="tuts-categ">
                        {data.map(x => <li key={x._id}><Link to={'#'}>{x.post_title}</Link></li>)} 
                    </ul>
                 </div>
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
                                    <div className="mt-20">
                                        <Helper.GenerateTutorialContent data={upcoming.tutorial.description} />
                                    </div>
                            } 

                        </div>
                    </div>
            </header>
        );
    }

    var TutorialLinks = () => {
        return (
            <div className="wrapper max-1150 offset-left offset-right ptb-30-50 flexbox gap-20 flex-wrap content-center"> 
                            
                        
                {
                    upcoming.chapters.length ?
                    (
                        upcoming.chapters.map(( chapter, k) => {
                            return ( <TutorialsList key={chapter._id} data={chapter.posts} chapter_title={chapter.chapter_title} index={k}/> );
                        })
                    ) :
                    (
                        upcoming.posts.length ?
                            Helper.chunkArray(upcoming.posts, 3 ).map(( posts, k) => {
                                return ( <TutorialsList key={k} data={posts} index={k}/> );
                            })
                        : ""
                    )
                }
                
            </div>
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

                        

                        <div className="wrapper max-1150 text-center">
                            <h2 className="text-center tutorial-contents-headline">Basic Giude fo PHP Tutorials</h2>
                            <p className="mt-15 tutorial-description text-center">
                                Hello! Do you have any question or suggestion about this site, or just want to say Hi? Send me a message using below form. I will get back to you as soon as possible.
                            </p>

                            <TutorialLinks />  
                            ds
                        </div>
                        
                        

                     </> 
                }
                
                

                
            </main>
            <Footer/>
        </>
    );
}

export { TurorialComponent };