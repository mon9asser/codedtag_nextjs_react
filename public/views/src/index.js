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

const Wrapper = ({ children }) => {
  const location = useLocation();

  React.useEffect(() => {
    Helper.initMethods();
  }, [location]);

  return children;
};


var WrappApplication = () => {
  
  return (
    <DataProvider>  
          <Routes>
            <Route path="/" element={<h1>Hello world</h1>} />
            <Route path="/contact-us/" element={<ContactPage />} /> 
            <Route path="/about-us/" element={<AboutPage />} />
            <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions/" element={<TermsConditionsPage />} />
            <Route path="/tutorials/" element={<TutorialsComponent />} />
            <Route path="/tutorials/:tut_slug/" element={<TurorialComponent />} />
            <Route path="/tutorials/:tut_slug/:post_slug/" element={<ArticleComponent/>} />
            <Route path="/tutorials/:tut_slug/t/:tab_slug/" element={<TabComponent/>} /> 
            <Route path="/tutorials/:tut_slug/t/:tab_slug/:post_slug/" element={<h1>Post Of Tab</h1>} /> 
            
            <Route path="*" element={<PageNotFound />} />
          </Routes> 
      </DataProvider>
  );
}


const App = () => {
  return (
    <BrowserRouter>
      <Wrapper>
        <WrappApplication />
      </Wrapper>
    </BrowserRouter>
  );
}
 

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
