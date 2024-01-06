import { Box, Button, TextField } from "@mui/material";
import GoogleButton from "react-google-button";
import React, { useState } from "react";
import "../style/signIn.scss";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loader from "./Loader";

export default function SignIn() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
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
      await api.register({
        user: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          birth_date: formData.birth_date,
          email: formData.email,
          password: formData.password,
        },
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
    setLoading(false);
  };

  return (
    <Box className="centering">
      <Box className="signInContainer">
        <form onSubmit={handleSubmit}>
          <Box className="nameContainer">
            <p className="label"> First Name</p>
            <TextField
              className="inputField"
              name="first_name"
              type="text"
              required
              placeholder="First Name"
              label="First Name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </Box>

          <Box className="nameContainer">
            <p className="label">Last Name</p>
            <TextField
              className="inputField"
              name="last_name"
              type="text"
              required
              placeholder="Last Name"
              label="Last Name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </Box>

          <Box className="birthDateContainer">
            <p className="label">Birthdate</p>
            <TextField
              className="inputField"
              name="birth_date"
              type="date"
              required
              variant="outlined"
              value={formData.birth_date}
              onChange={handleChange}
            />
          </Box>

          <Box className="mailContainer">
            <p className="label">Email</p>
            <TextField
              className="inputField"
              name="email"
              type="email"
              required
              placeholder="E-mail"
              label="E-mail"
              value={formData.email}
              onChange={handleChange}
            />
          </Box>

          <Box className="pwdContainer">
            <p className="label">Password</p>
            <TextField
              className="inputField"
              name="password"
              type="password"
              required
              placeholder="Password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </Box>

          <Box className="linkContainer">
            <Link className="login" to="/login">
              Back
            </Link>

            <Button className="signIn" type="submit">
              Sign in
            </Button>
          </Box>
          <Box className="googleContainer">
            <GoogleButton label="Sign In with Google" type="light" />
          </Box>
        </form>
        {loading && <Loader />}
      </Box>
    </Box>
  );
}
