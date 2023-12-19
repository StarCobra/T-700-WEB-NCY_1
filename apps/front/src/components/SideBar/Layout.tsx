import React from "react";
import User from "./User";
import Menu from "./Menu";
import GuestMenu from "./GuestMenu";
import GuestUser from "./GuestUser";
import "../../style/Default/default.scss";
import "../../style/sidebar.scss";
import { Box } from "@mui/material";
import Logo from "../../assets/sideBar/logo.png";
import { Link } from "react-router-dom";

export default function Layout() {
  // const defaultUser = {name:"ArnaudBrg", mail:"ArnaudBrg@gmail.com"}
  const defaultUser = null
  if (defaultUser != null) {
    return (
      <Box className="sideBarContainer">
        <Link to="/" className="logoLocation">
          <img src={Logo} alt="" />
        </Link>

        <User user={defaultUser} />

        <Menu />
      </Box>
    );  
  }

  else {
    return (
      <Box className="sideBarContainer">
        <Link to="/" className="logoLocation">
          <img src={Logo} alt="" />
        </Link>

        <GuestUser />

        <GuestMenu />
      </Box>
    );
  }
  
}
