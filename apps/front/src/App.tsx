import React from 'react';
import SideBar from './components/SideBar/SideBar';
import GlobalSettingDisplay from "./components/Admin/GlobalSettingDisplay";
import {Box} from "@mui/material";

function App() {
  return (
    <div className="layoutContainer">
      <SideBar />
      <Box className="displayContainer">
        <Box className="dataContainer">
            <GlobalSettingDisplay />
        </Box>
      </Box>
    </div>

  );
}

export default App;
