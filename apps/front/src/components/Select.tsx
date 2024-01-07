import React from "react";
import { Box, MenuItem, TextField } from "@mui/material";

export default function Select(props: any) {
  const {
    name = "Select",
    label = "",
    type = "unique",
    handleChange = null,
    options = [],
    forCrypto = false,
    ...other
  } = props;

  const [selected, setSelected] = React.useState([] as string[]);

  return (
    <Box className="selectCryptoContainer">
      <p>{label}</p>

      <Box className="SelectCryptoBox" color="warning">
        <TextField
          className="SelectCryptoLabel"
          name={name}
          label={label}
          select
          value={selected}
          fullWidth
          SelectProps={{ multiple: type === "multiple" }}
          color="warning"
          onChange={(event) => {
            const value = event.target.value;
            setSelected(typeof value === "string" ? value.split(",") : value);
            handleChange(event);
          }}
          {...other}
        >
          {options.map((option: any) => (
            <MenuItem
              key={option.id}
              value={forCrypto ? option.short_name : option.id}
            >
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
}
