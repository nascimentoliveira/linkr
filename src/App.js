import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn.js";
import SignUp from "./pages/SignUp.js";
import Timeline from "./pages/Timeline.js";
import UserPosts from "./pages/UserPosts.js";
import Hashtag from "./pages/Hashtag.js";
import NotFound from "./pages/NotFound.js";
import { UserProvider } from "./contexts/userContext.js";
import "./assets/styles/reset.css";
import "./assets/styles/style.css";

export default function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route index element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/users/:id" element={<UserPosts />} />
          <Route path="/hashtag/:hashtag" element={<Hashtag />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}
//
