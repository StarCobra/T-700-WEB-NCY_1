import React from "react";
import profilePic from "../../assets/sideBar/profil.png";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export default function User(props: any) {
  const { user } = props;

  return (
    <Link to={user ? "/profile" : "/login"} className="userLocation">
      {user ? (
        <>
          <Box className="userProfilePicture">
            <img src={profilePic} alt="" />
          </Box>

          <Box className="usernameContainer">
            <Box className="userName">{user?.name}</Box>
            <Box className="userMail">{user?.mail}</Box>;
          </Box>
        </>
      ) : (
        <>
          <Box className="menuIcon">
            <HomeOutlinedIcon />
          </Box>

          <Box className="menuLabel">Log in</Box>
        </>
      )}
    </Link>
  );
}
