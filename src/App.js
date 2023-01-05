import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {useState, useEffect } from 'react'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Timeline from './pages/Timeline.js';
import UserPosts from './pages/UserPosts.js';
/* import HashTag from './pages/HashTag.js';
import NotFound from './pages/NotFound.js'; */

import './assets/styles/reset.css';
import './assets/styles/style.css';
import UserContext from './contexts/userContext';
import axios from 'axios';

export default function App() {
  const [token, setToken] = useState("");
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  const userContext = {
      token,
      setToken,
      image,
      setImage,
      name,
      setName
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
        <Routes>
          {/* <Route index element={<Navigate replace to='/signin' />} /> */}
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/timeline' element={<Timeline />} />
          <Route path='/user/:id' element={<UserPosts />} />
          {/* <Route path='/hashtag/:hashtag' element={<HashTag />} />
            
            <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}