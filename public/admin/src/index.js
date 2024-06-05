 
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
import { CreatePage } from './components/create-pages.js';
import { CreateTutorial } from './components/create-tutorial.js';
import { CreateUser } from './components/create-user.js';

import { AuthWrapper } from './components/helpers/context.js';


var WrappApplication = () => (
  
  <BrowserRouter> 

      <Routes>
          <Route name={"Register"} path="/register" element={<Register/>} />
          <Route name={"Login"} path="/login" element={<Login/>} />
      </Routes>
      
      <AuthWrapper>
        <Routes> 
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/dashboard/settings" element={<Settings/>} /> 
            <Route path="/dashboard/create-post" element={<CreatePost/>} />
            <Route path="/dashboard/create-page" element={<CreatePage/>} />
            <Route path="/dashboard/create-tutorial" element={<CreateTutorial/>} />
            <Route path="/dashboard/create-user" element={<CreateUser/>} />             
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
