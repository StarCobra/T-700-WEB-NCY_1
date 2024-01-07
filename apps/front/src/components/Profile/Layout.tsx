import React from "react";
import "../../style/profile.scss";
import ProfileInformation from "./Information";
import { Box } from "@mui/material";
import useAuth from "../../Context/UserProvider";

export default function Layout() {
  const { user, userToken } = useAuth();

  return (
    <Box className="profileLayout">
      <Box className="profileThumbnailContainer">
        <img
          className="profileThumbnail"
          src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
          alt="profile"
        />
      </Box>

      <ProfileInformation user={user} userToken={userToken} />
    </Box>
  );
}
