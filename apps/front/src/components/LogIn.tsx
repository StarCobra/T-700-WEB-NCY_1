import { Box, Button, TextField } from "@mui/material";
import GoogleButton from "react-google-button";
import React, { useState } from "react";
import "../style/logIn.scss";
import { Link, Router } from "react-router-dom";
import Loader from "./Loader";
import useAuth from './AuthContext';

export default function LogIn() {
 
  const { logIn } = useAuth();
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await logIn({ email, password });
      setLoggedIn(true);
    } catch (error) {
      console.error('Erreur de connexion :', error);
    }
    setLoading(false);
  };

  return (
    <Box className="centering">
      <Box className="loginContainer">
        <TextField
          name="email"
          type="email"
          placeholder="Your E-mail"
          label="E-mail"
          className="mailInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          name="password"
          type="password"
          placeholder="Your password"
          label="Password"
          className="pwdInput"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
