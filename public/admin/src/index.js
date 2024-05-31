 
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
import { CreatePost } from './components/create-posts.js';

import { AuthWrapper } from './components/helpers/context.js';


var WrappApplication = () => (
  
  <BrowserRouter> 

      <Routes>
          <Route name={"Register"} path="/register" element={<Register/>} />
          <Route name={"Login"} path="/login" element={<Login/>} />
      </Routes>
      
      <AuthWrapper>
        <Routes> 
            <Route name={"Dashboard"} path="/dashboard" element={<Dashboard/>} />
            <Route name={"Settings"} path="/dashboard/settings" element={<Settings/>} /> 
            <Route name={"Create-post"} path="/dashboard/create-post" element={<CreatePost/>} /> 
        </Routes>
      </AuthWrapper>
      
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
