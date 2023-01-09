import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'

import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js';
import Timeline from './pages/Timeline.js';
import UserPosts from './pages/UserPosts.js';
import Hashtag from './pages/Hashtag.js';
import NotFound from './pages/NotFound.js';
import './assets/styles/reset.css';
import './assets/styles/style.css';
import UserContext from './contexts/userContext.js';

export default function App() {
  // const tokenStorage = JSON.parse(localStorage.getItem("token"));
  // const [token, setToken] = useState(tokenStorage);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({ username: '', picture: '', email: '' });

  // useEffect(() => {
  //   if (tokenStorage) {
  //     setToken(tokenStorage);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const userContext = {
    token,
    setToken,
    user, 
    setUser 
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/timeline' element={<Timeline />} />
          <Route path='/user/:id' element={<UserPosts />} />
          <Route path='/hashtag/:hashtag' element={<Hashtag />} />  
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}