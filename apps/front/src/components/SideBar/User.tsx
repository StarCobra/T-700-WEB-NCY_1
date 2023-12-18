import React from "react";
import profilePic from "../../assets/sideBar/profil.png";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function User(props: any) {
  const { user } = props;

  return (
    <Link to="/profile" className="userLocation">
      <Box className="userProfilePicture">
        <img src={profilePic} alt="" />
      </Box>

      <Box className="usernameContainer">
        <Box className="userName">{user?.name}</Box>
        <Box className="userMail">{user?.mail}</Box>
      </Box>
    </Link>
  );
}
