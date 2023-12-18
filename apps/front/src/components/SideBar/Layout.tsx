import React from "react";
import User from "./User";
import Menu from "./Menu";
import "../../style/default.scss";
import "../../style/sidebar.scss";
import { Box } from "@mui/material";
import Logo from "../../assets/sideBar/logo.png";
import { Link } from "react-router-dom";

export default function Layout() {
  return (
    <Box className="sideBarContainer">
      <Link to="/" className="logoLocation">
        <img src={Logo} alt="" />
      </Link>

      <User />

      <Menu />
    </Box>
  );
}
