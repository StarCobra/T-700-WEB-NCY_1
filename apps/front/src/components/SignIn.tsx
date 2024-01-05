import { Box, Button, TextField } from "@mui/material";
import GoogleButton from "react-google-button";
import React from "react";
import "../style/signIn.scss";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loader from "./Loader";

export default function SignIn() {
  return (
    <Box className="centering">
      <Box className="signInContainer">
        <Box className="nameContainer">
          <p className="label">Name</p>
          <TextField className="inputField" name="name" type="name" placeholder="Name" label="Name" />
        </Box>

        <Box className="birthDateContainer">
          <p className="label">Birthdate</p>
          <TextField
            className="inputField"
            id="birthdate"
            name="birthdate"
            type="date"
            variant="outlined"
          />
        </Box>

        <Box className="mailContainer">
          <p className="label">Email</p>
          <TextField
            className="inputField"
            name="email"
            type="email"
            placeholder="E-mail"
            label="E-mail"
          />
        </Box>

        <Box className="pwdContainer">
          <p className="label">Password</p>
          <TextField
            className="inputField"
            name="password"
            type="password"
            placeholder="Password"
            label="Password"
          />
        </Box>

        <Box className="linkContainer">
          <Link className="login" to="/login">Back</Link>

          <Button className="signIn">Sign in</Button>
        </Box>
        <Box className="googleContainer">
          <GoogleButton label="Sign In with Google" type="light" />

        </Box>
      </Box>
    </Box>
  );
}
