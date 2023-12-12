import React from "react";
import "../../style/article.scss";
import OneArticle from "./OneArticle";
import { Box } from "@mui/material";

export default function Layout() {
  return (
    <Box className="articleMasterContainer">
      <OneArticle />

      <OneArticle />

      <OneArticle />

      <OneArticle />
    </Box>
  );
}
