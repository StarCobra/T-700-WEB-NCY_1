import React from "react";
import { Box } from "@mui/material";
import LogIn from "./components/LogIn";
import SignIn from "./components/SignIn";
import SideBarLayout from "./components/SideBar/Layout";
import CryptoLayout from "./components/Crypto/Layout";
import ProfileLayout from "./components/Profile/Layout";
import ArticlesLayout from "./components/Articles/Layout";
import ArticleDetailsLayout from "./components/Articles/Details/Layout";
import { ArticleProvider } from "./Context/ArticleProvider";

import GlobalSettingsLayout from "./components/GlobalSetting/Layout";
import MobileSideBarLayout from "./components/SideBar/mobile/MobileSideBar";
import PreferencesLayout from "./components/Preferences/Layout";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Box className="layoutContainer">
      <SideBarLayout />

      <Box className="displayContainer">
        <Routes>
          <Route path="/" element={<CryptoLayout />} />
          <Route path="/profile" element={<ProfileLayout />} />
          <Route path="/settings" element={<GlobalSettingsLayout />} />
          <Route path="/preferences" element={<PreferencesLayout />} />
          <Route
            path="/articles"
            element={
              <ArticleProvider>
                <ArticlesLayout />
              </ArticleProvider>
            }
          />
          <Route
            path="/articles/:id"
            element={
              <ArticleProvider>
                <ArticleDetailsLayout />
              </ArticleProvider>
            }
          />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
      </Box>
      <MobileSideBarLayout />
    </Box>
  );
}

export default App;
