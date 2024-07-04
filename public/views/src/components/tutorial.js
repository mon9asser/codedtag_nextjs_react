
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

    return (<b>Tutorial Page</b>);
}

export { TurorialComponent };