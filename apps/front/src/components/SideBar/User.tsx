import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function User(props: any) {
  const { user } = props;

  return (
    <Link to="/profile" className="userLocation">
      <Box className="userProfilePicture">
          <img
              className="profileThumbnail"
              src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
              alt="profile"
          />
      </Box>

        <Box className="usernameContainer">
            <Box className="userName">{`${user?.first_name} ${user?.last_name}`}</Box>
            <Box className="userMail">{user?.email}</Box>
        </Box>
    </Link>
  );
}
