import React from "react";
import profilePic from "../../assets/sideBar/profil.png";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function User() {
  return (
    <Link to="/profile" className="userLocation">
      <Box className="userProfilePicture">
        <img src={profilePic} alt="" />
      </Box>

      <Box className="usernameContainer">
        <Box className="userName">Arnaud B</Box>

        <Box className="userMail">arnaud.bourgoin@gmail.com</Box>
      </Box>
    </Link>
  );
}
