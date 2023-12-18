import { Sheet } from "@mui/joy";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import GoogleButton from 'react-google-button'
import React from "react";
import '../../style/default.scss'

export default function SignIn() {

    return (
      <div className="body">
        <Box
          sx={{
            height: "99vh",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
            <Sheet
              sx={{
                width: 350,
                py: 3,
                px: 2,
                display: "flex",
                backgroundColor: "#2F2F2F",
                flexDirection: "column",
                gap: 2,
                borderRadius: "sm",
                boxShadow: "md",
              }}
              variant="outlined"
            >
              <h3>Name</h3>
              <TextField
                style={{backgroundColor: "white"}}
                name="name"
                type="name"
                placeholder="Name"
                label="Name"
              />
              <h3>Birthdate</h3>
              <TextField
                style={{backgroundColor: "white"}}
                id= "birthdate"
                name= "birthdate"
                label= "Birthdate"
                type= "date"
                variant="outlined"
                />  
                <h3>Email</h3>
              <TextField
                style={{backgroundColor: "white"}}
                name="email"
                type="email"
                placeholder="E-mail"
                label="E-mail"
              />
              <h3>Password</h3>
              <TextField
                style={{backgroundColor: "white"}}
                name="password"
                type="password"
                placeholder="Votre mot de passe"
                label="Mot de passe"
              />
    
              <Button
                style={{
                  color: "white",
                  backgroundColor: "#F4733A",
                  borderRadius: 7,
                  padding: 10,
                  width: 100,
                  margin: "auto",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Connexion
              </Button>
              <GoogleButton
                style={{margin: "auto"}}
                label="Sign In with Google"
                type="light"
                />

            </Sheet>
        </Box>
        </div>
      );
}