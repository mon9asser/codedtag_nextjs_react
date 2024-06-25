import React from 'react';
import ReactDOM from 'react-dom/client'; 
import {
  BrowserRouter,
  Routes,
  Route, 
} from "react-router-dom";



// Stylesheets 
import "./assets/css/styles.css"

// Components 
import { PageNotFound } from "./components/404.js" 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Hello world</h1>} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
); 