import React, { Component, lazy, Suspense } from 'react';
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
const PageNotFound = lazy(() => import("./components/404.js").then(module => ({ default: module.PageNotFound })));
const ContactPage = lazy(() => import('./components/contact.js').then(module => ({ default: module.ContactPage })));
const AboutPage = lazy(() => import("./components/about.js").then(module => ({ default: module.AboutPage })));
const PrivacyPolicyPage = lazy(() => import('./components/privacy-policy.js').then(module => ({ default: module.PrivacyPolicyPage })));
const TermsConditionsPage = lazy(() => import('./components/terms-and-conditions.js').then(module => ({ default: module.TermsConditionsPage })));
const TutorialsComponent = lazy(() => import('./components/tutorials.js').then(module => ({ default: module.TutorialsComponent })));
const TutorialComponent = lazy(() => import('./components/tutorial.js').then(module => ({ default: module.TutorialComponent })));
const ArticleComponent = lazy(() => import('./components/article.js').then(module => ({ default: module.ArticleComponent })));
const TabComponent = lazy(() => import("./components/tab.js").then(module => ({ default: module.TabComponent })));
const TabArticleComponent = lazy(() => import("./components/tab-article.js").then(module => ({ default: module.TabArticleComponent })));
const HomepageComponents = lazy(() => import('./components/home.js').then(module => ({ default: module.HomepageComponents })));
const SearchComponents = lazy(() => import('./components/search.js').then(module => ({ default: module.SearchComponents })));
  
var WrappApplication = () => {
  
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
          <Route path="/" element={<HomepageComponents/>} />
          <Route path="/contact-us/" element={<ContactPage />} /> 
          <Route path="/about-us/" element={<AboutPage />} />
          <Route path="/privacy-policy/" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions/" element={<TermsConditionsPage />} />
          <Route path="/tutorials/" element={<TutorialsComponent />} />
          <Route path="/tutorials/:tut_slug/" element={<TutorialComponent />} />
          <Route path="/tutorials/:tut_slug/:post_slug/" element={<ArticleComponent/>} />
          <Route path="/tutorials/:tut_slug/t/:tab_slug/" element={<TabComponent/>} /> 
          <Route path="/tutorials/:tut_slug/t/:tab_slug/:post_slug/" element={<TabArticleComponent/>} /> 
          <Route path="/search" element={<SearchComponents/>} /> 
          
          <Route path="*" element={<PageNotFound />} />
      </Routes> 
    </Suspense>
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
