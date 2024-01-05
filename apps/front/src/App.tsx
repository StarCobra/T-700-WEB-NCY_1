import React from "react";
import { Box } from "@mui/material";
import LogIn from "./components/LogIn";
import SignIn from "./components/SignIn";
import { AuthProvider } from './components/AuthContext';
import SideBarLayout from "./components/SideBar/Layout";
import CryptoLayout from "./components/Crypto/Layout";
import ProfileLayout from "./components/Profile/Layout";
import ArticlesLayout from "./components/Articles/Layout";
import ArticleDetailsLayout from "./components/Articles/Details/Layout";
import GlobalSettingsLayout from "./components/GlobalSetting/Layout";
import PreferencesLayout from "./components/Preferences/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Box className="layoutContainer">
        <SideBarLayout />

        <Box className="displayContainer">
          <AuthProvider>
            <Routes>
              <Route path="/" element={<CryptoLayout />} />
              <Route path="/profile" element={<ProfileLayout />} />
              <Route path="/settings" element={<GlobalSettingsLayout />} />
              <Route path="/preferences" element={<PreferencesLayout />} />
              <Route path="/articles" element={<ArticlesLayout />} />
              <Route path="/articles/:id" element={<ArticleDetailsLayout />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/login" element={<LogIn />} />
            </Routes>
          </AuthProvider>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
