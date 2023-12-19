import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

export default function GuestMenu() {
  return (
    <Box className="differentMenus">
      <Link to={"/signin"} className="Menu" id="menu1">
        <Box className="menuIcon">
         <DescriptionOutlinedIcon />
        </Box>
        <Box className="menuLabel">SignIn</Box>
      </Link>
      
      <Link to="/" className="Menu" id="menu2">
        <Box className="menuIcon">
          <HomeOutlinedIcon />
        </Box>
        <Box className="menuLabel">Home</Box>
      </Link>

      <Link to={"/articles"} className="Menu" id="menu3">
        <Box className="menuIcon">
         <DescriptionOutlinedIcon />
        </Box>
        <Box className="menuLabel">Articles</Box>
      </Link>
    </Box>
  );
}
