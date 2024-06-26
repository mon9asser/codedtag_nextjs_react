import React, { Component } from "react";
import { Header } from "../parts/header"; 
import { Footer } from "../parts/footer";

class PageNotFound extends Component {

    componentDidMount() {
        // Any necessary initialization can be done here
    }

    render() {
        return (
            <>
                <Header />
                <section className="page-not-found-section">
                    <h1 className="error-code">404</h1>
                    <div className="error-message-container">

                        <form className="search-form">
                            <input type="text" placeholder="What are you looking for?" />
                            <button className="btn third-btn radius-5 custom-header-btn">Search</button>
                        </form>

                        <p className="error-message">
                            I'm afraid you've found a page that doesn't exist on CodedTag. This can happen if you follow a link to something that has been deleted, or if the link was wrong from the start.
                        </p> 

                        <div className="items-center flexbox navigation-links"> 
                            <a href="#" className="btn btn-default radius-30 btn-404">Go Back</a>
                            <a href="#" className="btn btn-default radius-30 btn-404">Homepage</a>
                        </div> 

                        <div className="border-bottom mt-space"></div>

                        <div className="latest-articles">
                            <h2 className="title">Don't miss our tutorials</h2>
                            <ul className="block-list custom-widget-links font-14 no-borders-list no-effect">
                                <li><a href="/article-1" className="article-link">Understanding React Components</a></li>
                                <li><a href="/article-2" className="article-link">A Guide to JavaScript ES6 Features</a></li>
                                <li><a href="/article-3" className="article-link">CSS Flexbox: A Comprehensive Tutorial</a></li>
                            </ul>
                        </div>

                       
                    </div>
                </section>
                <Footer />
            </>
        );
    }
}

export { PageNotFound };
