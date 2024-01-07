import React from "react";
import "../../style/profile.scss";
import ProfileInformation from "./Information";
import { Box } from "@mui/material";
import exampleImage from "../../assets/profile/profileExample.png";

export default function Layout() {
  const exampleUser = {name:"test", mail:"test@gmail.com", roles:"ADMIN", birth_date:"2000-01-01"};
  return (
    <Box className="profileLayout">
      <Box className="profileThumbnailContainer">
        <img src={exampleImage} alt="" />
      </Box>

      <ProfileInformation user={exampleUser} />
    </Box>
  );
}
