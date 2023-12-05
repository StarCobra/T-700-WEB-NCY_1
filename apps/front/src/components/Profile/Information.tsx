import React from "react";
import { Box, Button, TextField } from "@mui/material";

export default function Information() {
  return (
    <Box className="centeringDiv">
      <Box className="profileInfoContainer">
        <Box id="usernameLabel" className="labelInfo">
          Username :
        </Box>

        <Box id="username" className="userInfo">
          <p>Arnaud Bourgoin</p>

          <TextField id="standard-basic" label="Username" className="hidden" variant="standard" />
        </Box>

        <Box id="mailLabel" className="labelInfo">
          Email Address :
        </Box>

        <Box id="mail" className="userInfo">
          <p>Arnaudbrg@gmail.com</p>

          <TextField id="standard-basic" label="Mail" className="hidden" variant="standard" />
        </Box>

        <Box id="birthLabel" className="labelInfo">
          Birth Date :
        </Box>

        <Box id="birth" className="userInfo">
          <p>2000-03-10</p>

          <TextField id="standard-basic" label="A CHANGER" className="hidden" variant="standard" />
        </Box>

        <Box id="edit" className="buttonDiv">
          <Button>Edit my profile</Button>
        </Box>

        <Box id="delete" className="buttonDiv">
          <Button>Delete my profile</Button>
        </Box>
      </Box>
    </Box>
  );
}
