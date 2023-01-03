import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {useState, useEffect } from 'react'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Timeline from './pages/Timeline.js';
/* import HashTag from './pages/HashTag.js';
import UserPosts from './pages/UserPosts.js';
import NotFound from './pages/NotFound.js'; */

import './assets/styles/reset.css';
import './assets/styles/style.css';
import UserContext from './contexts/userContext';
import axios from 'axios';

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  const [control,setControl] = useState(false);
  const [load,setLoad] = useState(false);

  useEffect(()=>{
      if(window.location.pathname !== "/" && window.location.pathname !== "/signup"){
          getUserData();
      }
  },[])

  async function getUserData(){
      if(token){
          const config = {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          };
          try{
              const result = await axios.get(`/data`,config);
              setImage(result.data.picture);
              setName(result.data.username);
          }catch(e){
              localStorage.setItem("authToken", "");
              window.location.reload();
          }
      }
  }
  const userContext = {
      token,
      setToken,
      image,
      setImage,
      name,
      setName,
      userId,
      setUserId,
      control,
      setControl,
      load,
      setLoad
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={userContext}>
        <Routes>
          {/* <Route index element={<Navigate replace to='/signin' />} /> */}
          <Route path='/' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/timeline' element={<Timeline />} />
          {/* <Route path='/hashtag/:hashtag' element={<HashTag />} />
            <Route path='/user/:id' element={<UserPosts />} />
            <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}