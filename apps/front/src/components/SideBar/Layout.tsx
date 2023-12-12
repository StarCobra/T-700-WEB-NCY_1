import React from "react";
import User from "./User";
import Menu from "./Menu";
import "../../style/default.scss";
import "../../style/sidebar.scss";
import { Box } from "@mui/material";
import Logo from "../../assets/sideBar/logo.png";

export default function Layout() {
  return (
    <Box className="sideBarContainer">
      <Box className="logoLocation">
        <img src={Logo} alt="" />
      </Box>

      <User />

      <Menu />
    </Box>
  );
}
