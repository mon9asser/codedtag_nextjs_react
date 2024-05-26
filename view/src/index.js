 
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

var WrappApplication = () => (
  <BrowserRouter> 
      <Routes>
      
        <Route path="/register" element={<Register/>} />
        <Route path="/login" element={<Login/>} />

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
