import React, { Component } from 'react';
import ReactDOM from 'react-dom/client'; 
import { Helper } from './helper.js';

import { DataProvider } from './context.js';

import {
  BrowserRouter,
  Routes,
  Route, 
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
class WrappApplication extends Component {
  componentDidMount = async () => {
    // Initialize methods
    setTimeout(() => Helper.initMethods(), 1000);
  }

  render() {
   alert("Api to check tutorial exists if it not found so redirect it to page 404 by the server")
    return (
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>Hello world</h1>} />
            <Route path="/contact-us/" element={<ContactPage />} /> 
            <Route path="/about-us/" element={<AboutPage />} />
            <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
            <Route path="/terms-and-conditions/" element={<TermsConditionsPage />} />
            <Route path="/tutorials/" element={<TutorialsComponent />} />
            <Route path="/tutorials/:tut_slug" element={<TurorialComponent />} />
            
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </DataProvider>
    );
  }
}

// Render
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WrappApplication />);
