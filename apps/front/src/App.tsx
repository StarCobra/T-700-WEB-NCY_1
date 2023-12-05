import React from "react";
import { Box } from "@mui/material";
import SideBarLayout from "./components/SideBar/Layout";
import CryptoLayout from "./components/Crypto/Layout";

function App() {
  return (
    <Box className="layoutContainer">
      <SideBarLayout />

      <Box className="displayContainer">
        <Box className="dataContainer">
          <CryptoLayout />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
