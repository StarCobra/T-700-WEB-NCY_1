import React from "react";
import profilePic from "../../assets/sideBar/profil.png";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function GuestUser() {

  return (
    <Link to="/login" className="userLocation">
      <Box className="userProfilePicture">
        <img src={profilePic} alt="" />
      </Box>

      <Box className="usernameContainer">
        <Box className="userName">Guest</Box>
        <Box className="login">Click here to Login</Box>
      </Box>
    </Link>
  );
}
