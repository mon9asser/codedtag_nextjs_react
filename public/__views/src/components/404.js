import React, { Component } from "react";
import { Header } from "../parts/header"; 
import { Footer } from "../parts/footer";
import { Link } from "react-router-dom"; 
import { Helper } from "../helper";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";


// disable_ads - page_template 
var PageNotFound = ({parts}) => {

    const navigate = useNavigate();
    var [upcoming, upcoming_change] = React.useState({
        content: null,
        load_parts: true,
        settings: null,
        menus: null
    });
    
    React.useEffect(() => {
        
        Helper.sendRequest({
            api: "post/get?post_type=1",
            method: "get",
            data: {}
        }).then(row => {
            
            if( row.is_error ) {
                return; 
            }
             
            var pages = row.data.filter( x => x.page_template == "not_found_404_page");
            var not_found = null;
            if( pages.length ) {
                not_found = pages[pages.length - 1];  
            }

            var objx = { 
                content: not_found, 
                settings: row.settings, 
                menus: row.menus
            }
            if( parts != undefined ) {
                objx.load_parts = parts
            }

            upcoming_change(objx)
        }) 

    }, [])

    var  goBack = () => {
        navigate(-1); 
    };
    var NotFoundComponentsParts = () => {
        
        return (
            <>
                 <Helmet>
                    <title>{upcoming.content?.meta_title || "Not Found"}</title>
                    <meta name="description" content={upcoming.content?.meta_description || "This page does not existI'm afraid you've found a page that doesn't exist on our site. This can happen if you follow a link to something that has been deleted, or if the link was wrong from the start."} />
                    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex, unavailable_after: 2024-12-31T23:59:59Z" />
                </Helmet>

                {
                    upcoming.load_parts? <Header menus={upcoming.menus} settings={upcoming.settings}/>: ''
                }
                <section className="page-block-section">

                    <span className="error-code">404</span>
                    <h1 className="page-not-found-msg">{upcoming.content?.post_title || "We couldn’t find that page."}</h1>

                    <div className="error-message-container">
                         
                        <Helper.SearchComponent/> 

                        {
                            (upcoming.content == null || !upcoming.content?.blocks?.filter(x => x.type === 'paragraph').length) ? (
                                <p className="error-message">
                                    Oops! The page you're looking for can't be found. It might have been moved or deleted, or maybe the link you clicked is wrong. Don't worry, you can go back to our homepage and find what you need from there. Thanks for your understanding!
                                </p>
                            ) : (
                                upcoming.content?.blocks.map(x => {
                                    if (x.type === "paragraph") {
                                        
                                        return (
                                            <p key={x.id} className="error-message">
                                                {x.data.text}
                                            </p>
                                        );
                                    }
                                    return ''; // Add this line to avoid returning undefined
                                })
                            )
                        }


                        <div className="items-center flexbox navigation-links"> 
                            <Link to={"/"} className="btn btn-default radius-30 btn-404">Homepage</Link>
                        </div>  

                    
                    </div>
                </section>
                {
                    upcoming.load_parts? <Footer menus={upcoming.menus} settings={upcoming.settings}/>: ''
                }
            </> 
        );
    } 

    return (
        <>
            <Header menus={upcoming.menus} settings={upcoming.settings}/> 
            { 
                upcoming.content == null || upcoming.settings == null ? 
                <Helper.PreLoader type={'article'} /> :
                <NotFoundComponentsParts />
            } 
            <Footer menus={upcoming.menus} settings={upcoming.settings}/> 
        </>       
    );
}


export { PageNotFound }

