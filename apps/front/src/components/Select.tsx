import React from "react";
import { Box, MenuItem, TextField } from "@mui/material";

export default function Select(props: any) {
  const {
    name = "Select",
    label = "",
    type = "unique",
    handleChange = null,
    options = [],
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
        >
          {options.map((option: any) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
}
