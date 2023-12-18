import * as React from "react";
import "../../style/admin.scss";
import Form from "./Form";
import { Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

export default function Layout() {
  return (
    <Box className="ArrayDisplay">
      <Box className="titleContainer">
        <Box className="title">
          <h1>Global Settings</h1>
        </Box>
        <Box className="icon">
          <SettingsIcon />
        </Box>
      </Box>

      <Form />

      <Box className="commentContainer">
        <h3>
          {"Please "}
          <a href="mailto:developpers@cryptofanatix.com?subject=Add new crypto&body=Hello, I want to add a new crypto called : ">
            contact a developper
          </a>
          {" if you want to add a new crypto."}
        </h3>
      </Box>
    </Box>
  );
}
