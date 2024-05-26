 
import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  BrowserRouter,
  Routes,
  Route, 
} from "react-router-dom";



import reportWebVitals from './reportWebVitals';


// import components 
import { Register } from './components/register';
import { Login } from './components/login';
import { Dashboard } from "./components/dashboard.js";
import { Settings } from './components/settings.js';

var WrappApplication = () => (
  <BrowserRouter> 
      <Routes>
      
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />

        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/dashboard/settings" element={<Settings/>} />

      </Routes>
  </BrowserRouter>
);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <WrappApplication />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
