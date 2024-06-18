 
import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  BrowserRouter,
  Routes,
  Route, 
} from "react-router-dom";



 
import reportWebVitals from './reportWebVitals';


import { AuthWrapper } from './components/helpers/context.js';
// import components 
import { Register } from './components/register';
import { Login } from './components/login';
import { Dashboard } from "./components/dashboard.js";
import { Settings } from './components/settings.js'; 
import { CreatePost } from './components/create-posts.js';
import { CreatePage } from './components/create-pages.js';
import { CreateTutorial } from './components/create-tutorial.js';
import { CreateUser } from './components/create-user.js';
import { Chapters } from './components/chapters.js';
import { Menus } from './components/menus.js';
import { AdCampaigns } from './components/campaigns.js';
import { Contacts } from './components/contacts.js';
import { ManageLinks } from './components/manage-links.js'; 
import { Comments} from './components/comments.js';
import { Posts} from './components/posts.js';
import { Pages} from './components/pages.js';
import { Tutorials} from './components/Tutorials.js';

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
            <Route path="/dashboard/chapters" element={<Chapters/>} /> 
            <Route path="/dashboard/menus" element={<Menus/>} /> 
            <Route path="/dashboard/campaigns" element={<AdCampaigns/>} /> 
            <Route path="/dashboard/messages" element={<Contacts/>} /> 
            <Route path="/dashboard/links" element={<ManageLinks/>} /> 
            <Route path="/dashboard/comments" element={<Comments/>} /> 
            <Route path="/dashboard/posts" element={<Posts/>} /> 
            <Route path="/dashboard/pages" element={<Pages/>} /> 
            <Route path="/dashboard/tutorials" element={<Tutorials/>} /> 
            
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
