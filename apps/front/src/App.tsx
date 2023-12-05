import React from "react";
import { Box } from "@mui/material";
import SideBarLayout from "./components/SideBar/Layout";
import CryptoLayout from "./components/Crypto/Layout";
import ProfileLayout from "./components/Profile/Layout";
import ArticlesLayout from "./components/Articles/Layout";
import ArticleDetailsLayout from "./components/Articles/Details/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Box className="layoutContainer">
        <SideBarLayout />

        <Box className="displayContainer">
          <Box className="dataContainer">
            <Routes>
              <Route path="/" element={<CryptoLayout />} />
              <Route path="/profile" element={<ProfileLayout />} />
              <Route path="/articles" element={<ArticlesLayout />} />
              <Route path="/articles/:id" element={<ArticleDetailsLayout />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
