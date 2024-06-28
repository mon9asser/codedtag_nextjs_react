import React, { Component } from "react";
import { Header } from "../parts/header"; 
import { Footer } from "../parts/footer";
import { Link } from "react-router-dom";
import withNavigation from "../utils/with-navigation";
import { Helper } from "../helper";
import { Helmet } from "react-helmet";

// disable_ads - page_template


class PageNotFoundComponents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content: null
        };
    }

    goBack = () => {
        this.props.navigate(-1); // Go back in the history stack
    };
 
    componentDidMount = async () => {
        
        // get content of not found page 
        var reqs = await Helper.sendRequest({
            api: "post/get?post_type=1",
            method: "get",
            data: {}
        })
        
        if(reqs.is_error ) { return ; }
        
        var pages = reqs.data.filter( x => x.page_template == "not_found_404_page");
        if( pages.length ) {
            
            var not_found = pages[pages.length - 1]; 
            this.setState({ content: not_found })
            
        }


    }
     
    render() {
        
        return (
            <>

                <Helmet>
                    <title>{this.state.content?.meta_title || "Not Found"}</title>
                    <meta name="description" content={this.state.content?.meta_description || "This page does not existI'm afraid you've found a page that doesn't exist on our site. This can happen if you follow a link to something that has been deleted, or if the link was wrong from the start."} />
                    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noodp, notranslate, noimageindex, unavailable_after: 2024-12-31T23:59:59Z" />
                </Helmet>

                <Header/>

                <section className="page-not-found-section">

                    <span className="error-code">404</span>
                    <h1 className="page-not-found-msg">{this.state.content?.post_title || "We couldn’t find that page."}</h1>
                    
                    <div className="error-message-container">
                        
                        <form className="search-form">
                            <input type="text" placeholder="What are you looking for?" />
                            <button className="btn third-btn radius-5 custom-header-btn">Search</button>
                        </form>

                        {
                            (this.state.content == null || !this.state.content?.blocks?.filter(x => x.type === 'paragraph').length) ? (
                                <p className="error-message">
                                    Oops! The page you're looking for can't be found. It might have been moved or deleted, or maybe the link you clicked is wrong. Don't worry, you can go back to our homepage and find what you need from there. Thanks for your understanding!
                                </p>
                            ) : (
                                this.state.content?.blocks.map(x => {
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
                            <Link to={this.goBack} className="btn btn-default radius-30 btn-404">Go Back</Link>
                            <Link to={"/"} className="btn btn-default radius-30 btn-404">Homepage</Link>
                        </div>  

                       
                    </div>
                </section>

                <Footer/>
            </>
        );
    }
}

var PageNotFound = withNavigation(PageNotFoundComponents); 
export { PageNotFound };
