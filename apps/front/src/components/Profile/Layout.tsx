import React from "react";
import "../../style/profile.scss";
import ProfileInformation from "./Information";
import { Box } from "@mui/material";
import exampleImage from "../../assets/profile/profileExample.png";

export default function Layout() {
  return (
    <Box className="centeringDiv">
      <Box className="profileLayout">
        <Box className="profileThumbnailContainer">
          <img src={exampleImage} alt="" />
        </Box>

        <ProfileInformation />
      </Box>
    </Box>
  );
}
