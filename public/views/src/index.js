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

class WrappApplication extends Component {
  componentDidMount = async () => {
    // Initialize methods
    setTimeout(() => Helper.initMethods(), 1000);
  }

  render() {
   
    return (
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<h1>Hello world</h1>} />
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
