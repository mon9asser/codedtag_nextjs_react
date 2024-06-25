import { Component } from "react";
import { Header } from "../parts/header"; 
 

class PageNotFound extends Component {
     
    render() {

        return (
            <>
                <Header/>
                
                <section style={{padding: "40px 25px"}}>
                    <h1 style={{fontSize: "16vw", textAlign: "center", overflow: "hidden", lineHeight: "16vw"}}>404</h1>
                    <div style={{display:"block", color:"#666", padding: "10px", maxWidth: "450px", margin: "0 auto"}}>
                        <p style={{marginBottom: "30px", marginTop: "30px"}}>
                        I'm afraid you've found a page that doesn't exist on CodedTag. This can happen if you follow a link to something that has been deleted, or if the link was wrong from the start. 
                        </p>
                        <p style={{marginBottom: "30px"}}>
                        But don't worry! You can go back to the homepage and start again, or try using the search bar to find what you need. If you think this is an error, please let us know. Keep exploring, and you'll find what you're looking for soon!
                        </p>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <a href="#" style={{color:"blue"}}>
                                Go Back
                            </a>
                            <a href="#" style={{color:"blue"}}>
                                Go to Homepage
                            </a>    
                        </div>
                    </div>
                </section>
            </>
        );

    }

}

export  { PageNotFound };