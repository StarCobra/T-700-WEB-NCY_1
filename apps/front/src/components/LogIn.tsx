import { Box, Button, TextField } from "@mui/material";
import GoogleButton from "react-google-button";
import React, { useState } from "react";
import "../style/logIn.scss";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loader from "./Loader";

export default function LogIn() {
 
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  
  const submit = async () => {
    setLoading(true);
    try {
      const loggedInUser = await api.logIn(user);

      setConnected(true);
      console.log('Utilisateur connecté :', loggedInUser);

    } catch (error) {
      console.error('Erreur de connexion :', error);
    }
    setLoading(false);
  }

  return (
    <Box className="centering">
      <Box className="loginContainer">
        <TextField
          name="email"
          type="email"
          placeholder="Your E-mail"
          label="E-mail"
          className="mailInput"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <TextField
          name="password"
          type="password"
          placeholder="Your password"
          label="Password"
          className="pwdInput"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />

        <Box className="linkContainer">
          <Link to="/signin" className="signIn">Sign in</Link>

          <Button
            className="login"
            onClick={submit}>Log in</Button>
        </Box>
        <Box className="googleButton">
          <GoogleButton className="googleButton" label="Log In with Google" type="light" />
        </Box>
        {loading && ( <Loader />)}
      </Box>
    </Box>
  );
}
