import React from "react";
import User from "./User";
import Menu from "./Menu";
import "../../style/Default/default.scss";
import "../../style/sidebar.scss";
import { Box } from "@mui/material";
import Logo from "../../assets/sideBar/logo.png";
import { Link } from "react-router-dom";
import useAuth from "../../Context/UserProvider";

export default function Layout() {
  const { user } = useAuth();
  return (
    <Box className="sideBarContainer">
      <Link to="/" className="logoLocation">
        <img src={Logo} alt="" />
      </Link>

      {user && <User user={user} />}

      <Menu user={user} />
    </Box>
  );
}
