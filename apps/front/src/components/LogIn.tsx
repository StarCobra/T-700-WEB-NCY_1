import { Box, Button, TextField } from "@mui/material";
import GoogleButton from "react-google-button";
import React from "react";
import "../style/logIn.scss";
import { Link } from "react-router-dom";

export default function LogIn() {
  return (
    <Box className="centering">
      <Box className="loginContainer">
        <TextField
          name="email"
          type="email"
          placeholder="Your E-mail"
          label="E-mail"
          className="mailInput"
        />
        <TextField
          name="password"
          type="password"
          placeholder="Your password"
          label="Password"
          className="pwdInput"
        />

        <Box className="linkContainer">
          <Link to="/signin" className="signIn">Sign in</Link>

          <Button className="login">Log in</Button>
        </Box>
        <Box className="googleButton">
          <GoogleButton className="googleButton" label="Log In with Google" type="light" />
        </Box>
      </Box>
    </Box>
  );
}
