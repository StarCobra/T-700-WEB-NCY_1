import React from "react";
import LogoSideBar from "./Logo";
import User from "./User";
import Menu from "./Menu";
import "../../style/default.scss";
import "../../style/sidebar.scss";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <Box className="sideBarContainer">
      <LogoSideBar />

      <User />

      <Menu />
    </Box>
  );
}
