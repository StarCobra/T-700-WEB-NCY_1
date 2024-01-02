import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import { USER_ROLE_ADMIN } from "../../constants/user";

export default function Menu(props: any) {
  const { user } = props;

  return (
    <Box className="differentMenus">

    {user === null ? (
      <Link to="/login" className="Menu" id="menu1">
        <Box className="menuIcon">
          <LoginOutlinedIcon />
        </Box>

        <Box className="menuLabel">Login / Sign in</Box>
      </Link>
    ) : null}

      <Link to="/" className="Menu" id={user ? "menu1" : "menu2"}>
        <Box className="menuIcon">
          <HomeOutlinedIcon />
        </Box>

        <Box className="menuLabel">Home</Box>
      </Link>

      {user?.roles === USER_ROLE_ADMIN && (
        <Link to={"/settings"} className="Menu" id="menu2">
          <Box className="menuIcon">
            <SettingsOutlinedIcon />
          </Box>

          <Box className="menuLabel">Settings</Box>
        </Link>
      )}

      <Link to={"/articles"} className="Menu" id="menu3">
        <Box className="menuIcon">
          <DescriptionOutlinedIcon />
        </Box>

        <Box className="menuLabel">Articles</Box>
      </Link>

      {user && (
        <Link to="/logout" className="Menu" id="menu4">
          <Box className="menuIcon">
            <LogoutOutlinedIcon />
          </Box>

          <Box className="menuLabel">Logout</Box>
        </Link>
      )}
    </Box>
  );
}
