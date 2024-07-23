import React, { Component } from 'react';
import ReactDOM from 'react-dom/client'; 
import { Helper } from './helper.js';

import { DataProvider } from './context.js';

import {
  BrowserRouter,
  Routes,
  Route, 
  useLocation 
} from "react-router-dom";

// Stylesheets 
import "./assets/css/styles.css"

// Components 
import { PageNotFound } from "./components/404.js"
import { ContactPage } from './components/contact.js';
import { AboutPage } from "./components/about.js"
import { PrivacyPolicyPage } from './components/privacy-policy.js';
import { TermsConditionsPage } from './components/terms-and-conditions.js';

import { TutorialsComponent } from './components/tutorials.js'
import { TurorialComponent } from './components/tutorial.js'
import {ArticleComponent} from './components/article.js'

import { TabComponent } from "./components/tab.js"
import { TabArticleComponent } from "./components/tab-article.js"
import { HomepageComponents } from './components/home.js';

import { SearchComponents } from './components/search.js';
  
var WrappApplication = () => {
  
  return (
    <Routes>
        <Route path="/" element={<HomepageComponents/>} />
        <Route path="/contact-us/" element={<ContactPage />} /> 
        <Route path="/about-us/" element={<AboutPage />} />
        <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions/" element={<TermsConditionsPage />} />
        <Route path="/tutorials/" element={<TutorialsComponent />} />
        <Route path="/tutorials/:tut_slug/" element={<TurorialComponent />} />
        <Route path="/tutorials/:tut_slug/:post_slug/" element={<ArticleComponent/>} />
        <Route path="/tutorials/:tut_slug/t/:tab_slug/" element={<TabComponent/>} /> 
        <Route path="/tutorials/:tut_slug/t/:tab_slug/:post_slug/" element={<TabArticleComponent/>} /> 
        <Route path="/search" element={<SearchComponents/>} /> 
        
        <Route path="*" element={<PageNotFound />} />
    </Routes> 
  );
}


const App = () => {
  return (
    <BrowserRouter>
       <WrappApplication />
    </BrowserRouter>
  );
}
 

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
