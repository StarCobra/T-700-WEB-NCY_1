import React from "react";
import "../../../style/sidebar.scss";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { Link } from "react-router-dom";
import { USER_ROLE_ADMIN } from "../../../constants/user";
import useAuth from "../../../Context/UserProvider";

export default function MobileSideBar() {
  const { user } = useAuth();
  const [value, setValue] = React.useState('recents');
  const { logOut } = useAuth();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box className="mobileSideBarContainer">
      <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
        {!user && 
          <Link to="/login">
              <BottomNavigationAction
                label="Login"
                value="login"
                icon={<LoginOutlinedIcon />}
            />
          </Link>
        }
        <Link to="/">
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeOutlinedIcon />}
          />
        </Link>
        <Link to="/articles">
          <BottomNavigationAction
            label="Articles"
            value="articles"
            icon={<DescriptionOutlinedIcon />}
          />
        </Link>
        {user?.roles === USER_ROLE_ADMIN && (
        <Link to="/settings">
          <BottomNavigationAction label="Admin" value="admin" icon={<SettingsOutlinedIcon />} />
          </Link>
        )}
        {user && 
          <Link to="/logout" onClick={() => logOut()}>
              <BottomNavigationAction
                label="Logout"
                value="logout"
                icon={<LogoutOutlinedIcon />}
            />
          </Link>
        }
        </BottomNavigation>
    </Box>
  );
}