import { Box, Button, TextField } from "@mui/material";
import GoogleButton from "react-google-button";
import React, { useState } from "react";
import "../style/logIn.scss";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import useAuth from "../Context/UserProvider";

export default function LogIn() {
  const { logIn } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await logIn({
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
    setLoading(false);
  };

  return (
    <Box className="centering">
        <form className="loginContainer" onSubmit={handleSubmit}>
          <TextField
            name="email"
            type="email"
            required
            placeholder="Your E-mail"
            label="E-mail"
            className="mailInput"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            name="password"
            type="password"
            required
            placeholder="Your password"
            label="Password"
            className="pwdInput"
            value={formData.password}
            onChange={handleChange}
          />

          <Box className="linkContainer">
            <Link to="/signin" className="signIn">
              Sign in
            </Link>

            <Button className="login" type="submit">
              Log in
            </Button>
          </Box>
          <Box className="googleButton">
            <GoogleButton
              className="googleButton"
              label="Log In with Google"
              type="light"
            />
          </Box>
        </form>
        {loading && <Loader />}
      </Box>
  );
}
