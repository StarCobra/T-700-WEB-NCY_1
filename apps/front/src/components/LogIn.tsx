import { Box, Button, TextField } from "@mui/material";
import GoogleButton from "react-google-button";
import React from "react";
import "../style/Default/default.scss";
import { Link } from "react-router-dom";

export default function LogIn() {
  return (
    <Box>
      <TextField
        name="email"
        type="email"
        placeholder="E-mail"
        label="E-mail"
      />
      <TextField
        name="password"
        type="password"
        placeholder="Votre mot de passe"
        label="Mot de passe"
      />

      <Box>
        <Link to="/signin">Sign in</Link>

        <Button>Log in</Button>
      </Box>

      <GoogleButton label="Log In with Google" type="light" />
    </Box>
  );
}
