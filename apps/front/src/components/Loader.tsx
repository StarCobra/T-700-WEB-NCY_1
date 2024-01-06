import { Box } from "@mui/material";
import React from "react";
import "../style/Default/default.scss";

export default function Loader(props: any) {
  const { label = "Loading..." } = props;

  return (
    <Box className="loader">
      <h4>{label}</h4>
    </Box>
  );
}