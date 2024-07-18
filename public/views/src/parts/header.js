import React, {Component} from "react"; 
import logo from './../assets/img/logo-1.png'; 
import {Helper} from './../helper';
import { Link } from "react-router-dom";
import { DataContext } from "../context";
 
/*
 <Helper.DynamicHelmet elements={upcoming.settings.header_elms} />
                {Helper.renderElements(upcoming.settings?.footer_elms)}  
                */


var Header = ({menus, settings}) => {
    
    console.log(menus);
    console.log(settings);



    return (
       <Helper.PreLoader type="text" lines="2" />
    );

}



export { Header };