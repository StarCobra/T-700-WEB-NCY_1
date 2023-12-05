import React from "react";
import CryptoArray from "../Crypto/Array";
import Select from "../Select";
import { Box } from "@mui/material";

export default function Layout() {
  const options = [
    { value: "BTC", label: "BTC" },
    { value: "ETH", label: "ETH" },
    { value: "SOL", label: "SOL" },
    { value: "ADA", label: "ADA" },
    { value: "DOT", label: "DOT" },
    { value: "LUNA", label: "LUNA" },
    { value: "LINK", label: "LINK" },
  ];

  return (
    <Box className="ArrayDisplay">
      <Select
        name="Select"
        label="Select a crypto(s):"
        type="multiple"
        options={options}
        // eslint-disable-next-line prettier/prettier
        handleChange={(e: any) => console.log(e.target.value)}
      />

      <CryptoArray />
    </Box>
  );
}
