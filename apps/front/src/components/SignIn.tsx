import { Box, Button, TextField } from "@mui/material";
import GoogleButton from "react-google-button";
import React, { useState } from "react";
import "../style/signIn.scss";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loader from "./Loader";

export default function SignIn() {

    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      birthdate: '',
      email: '',
      password: ''
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
        const user = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          birthdate: formData.birthdate,
          email: formData.email,
          password: formData.password,
        };
        await api.createUser(formData,user);
      } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
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
            name="firstName" 
            type="firstName" 
            placeholder="First Name" 
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </Box>

        <Box className="nameContainer">
          <p className="label">Last Name</p>
          <TextField 
            className="inputField" 
            name="lastName" 
            type="lastName" 
            placeholder="Last Name" 
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </Box>

        <Box className="birthDateContainer">
          <p className="label">Birthdate</p>
          <TextField
            className="inputField"
            id="birthdate"
            name="birthdate"
            type="date"
            variant="outlined"
            value={formData.birthdate}
            onChange={handleChange}
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
            placeholder="Password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
          />
        </Box>

        <Box className="linkContainer">
          <Link className="login" to="/login">Back</Link>

          <Button 
          className="signIn"
          type="submit">Sign in</Button>
        </Box>
        <Box className="googleContainer">
          <GoogleButton label="Sign In with Google" type="light" />
        </Box>
        </form>
        {loading && ( <Loader />)}
      </Box>
    </Box>
  );
}
