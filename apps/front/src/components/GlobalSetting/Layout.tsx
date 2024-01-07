import * as React from "react";
import "../../style/admin.scss";
import { Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ManagementCrypto from "./ManagementCrypto";
import useAuth from "../../Context/UserProvider";
import ManagementKeyword from "./ManagementKeyword";

export default function Layout() {
  const { userToken } = useAuth();

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

      <Box>
        <ManagementCrypto userToken={userToken} />

        <ManagementKeyword userToken={userToken} />
      </Box>

      <Box className="commentContainer">
        <h3>
          {"Please "}
          <a href="mailto:developpers@cryptofanatix.com?subject=Request&body=Hello, I have a request for you, ">
            contact a developper
          </a>
          {" if you have an idea or a problem."}
        </h3>
      </Box>
    </Box>
  );
}
