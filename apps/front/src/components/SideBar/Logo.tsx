import React from "react";
import Logo from "../../assets/sideBar/logo.png";
import { Box } from "@mui/material";

export default function LogoSideBar() {
  return (
    <Box className="logoLocation">
      <img src={Logo} alt="" />
    </Box>
  );
}
