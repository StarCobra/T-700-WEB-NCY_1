import React from "react";
import { Box } from "@mui/material";

// eslint-disable-next-line prettier/prettier
export default function Content(props: any) {
  const { title = "", content = "" } = props;

  return (
    <Box className="contentContainer">
      {title !== "" && <h3>{title}</h3>}

      {content !== "" && <p>{content}</p>}
    </Box>
  );
}
