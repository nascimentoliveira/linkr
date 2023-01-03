import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

/* import SignIn from './pages/SignIn.js';
import SignUp from './pages/SignUp.js'; */
import Timeline from './pages/Timeline.js';
/* import HashTag from './pages/HashTag.js';
import UserPosts from './pages/UserPosts.js';
import NotFound from './pages/NotFound.js'; */

import './assets/styles/reset.css';
import './assets/styles/style.css';

export default function App() {
  return (
    <BrowserRouter>
          <Routes>
            {/* <Route index element={<Navigate replace to='/signin' />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} /> */}
            <Route path='/timeline' element={<Timeline />} />
            {/* <Route path='/hashtag/:hashtag' element={<HashTag />} />
            <Route path='/user/:id' element={<UserPosts />} />
            <Route path="*" element={<NotFound />} /> */}
          </Routes>
    </BrowserRouter>
  );
}