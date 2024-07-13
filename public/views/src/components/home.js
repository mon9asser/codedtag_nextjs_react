import React, { Component } from "react";
import { Header } from "../parts/header"; 
import { Footer } from "../parts/footer";
import { Helper } from "../helper";

var HomepageComponents = () => {
    return (
        <>
            <Header/>
                {
                    upcoming.post == null && upcoming.is_redirect == null ?
                    <Helper.PreLoader type={'article'} /> : (
                        upcoming.is_redirect ? <PageNotFound parts={false}/>: <TutorialContentComponents/>
                    )
                    
                }
            <Footer/>
        </>       
    );
}

export { HomepageComponents }