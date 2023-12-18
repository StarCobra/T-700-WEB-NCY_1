import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function Menu() {
  return (
    <Box className="differentMenus">
      <Link to="/" className="Menu" id="menu1">
        <Box className="menuIcon">
          <HomeOutlinedIcon />
        </Box>

        <Box className="menuLabel">Home</Box>
      </Link>

      <Link to={"/settings"} className="Menu" id="menu2">
        <Box className="menuIcon">
          <SettingsOutlinedIcon />
        </Box>

        <Box className="menuLabel">Settings</Box>
      </Link>

      <Link to={"/articles"} className="Menu" id="menu3">
        <Box className="menuIcon">
         <DescriptionOutlinedIcon />
        </Box>

        <Box className="menuLabel">Articles</Box>
      </Link>

      <Link to="/logout" className="Menu" id="menu4">
        <Box className="menuIcon">
          <LogoutOutlinedIcon />
        </Box>

        <Box className="menuLabel">Logout</Box>
      </Link>
    </Box>
  );
}
