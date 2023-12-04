import { Sheet } from "@mui/joy";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import GoogleButton from 'react-google-button'
import React from "react";
import '../../style/default.scss'

export default function LogIn() {

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
                type="light"
                />

            </Sheet>
        </Box>
        </div>
      );
}