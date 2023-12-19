import { Box, Button, TextField } from "@mui/material";
import GoogleButton from "react-google-button";
import React from "react";
import "../style/Default/default.scss";
import { Link } from "react-router-dom";

export default function SignIn() {
  return (
    <Box>
      <Box>
        <h3>Name</h3>
        <TextField name="name" type="name" placeholder="Name" label="Name" />
      </Box>

      <Box>
        <h3>Birthdate</h3>
        <TextField
          id="birthdate"
          name="birthdate"
          type="date"
          variant="outlined"
        />
      </Box>

      <Box>
        <h3>Email</h3>
        <TextField
          name="email"
          type="email"
          placeholder="E-mail"
          label="E-mail"
        />
      </Box>

      <Box>
        <h3>Password</h3>
        <TextField
          name="password"
          type="password"
          placeholder="Votre mot de passe"
          label="Mot de passe"
        />
      </Box>

      <Box>
        <Link to="/login">Back</Link>

        <Button>Sign in</Button>
      </Box>
      <GoogleButton label="Sign In with Google" type="light" />
    </Box>
  );
}
