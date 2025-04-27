import './App.css';
import axios from "axios"
import Application from './Components/Application/Application.jsx';
import Layout from './Components/Layout/Layout.jsx';
import LoginPage from './Components/LoginPage/LoginPage.jsx';
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { createContext, useEffect } from 'react';
import {AuthProvider} from './Contexts/AuthProvider/AuthProvider.jsx';
import Register from './Components/Register/Register.jsx';
import { PostHandlerProvider } from './Contexts/PostHandlerProvider/PostHandlerProvider.jsx';
import { UserProvider } from './Contexts/UserProvider/UserProvider.jsx';
import Profile from './Components/Application/Profile/Profile.jsx';
import WebSocketComponent from './Components/WebSocket/WebSocketComponent.jsx';
import FilteredPosts from './Components/FilteredPosts/FilteredPosts.jsx';


function App() {

  return (
    <>
        <AuthProvider>

      <PostHandlerProvider>
        <UserProvider>
        <BrowserRouter>
        <WebSocketComponent/>

          <Routes>
            <Route path="/" element={<Layout/>}>
              <Route path="app" element={<Application />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<Register/>} />
              <Route path="profile/:id" element={<Profile/>}/>
              <Route path="filter/:param" element={<FilteredPosts/>}/>
            </Route>
          </Routes>
        </BrowserRouter>
        </UserProvider>
      </PostHandlerProvider>
      </AuthProvider>
    </>

  );
}

export default App;