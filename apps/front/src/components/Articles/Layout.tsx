import React from "react";
import "../../style/article.scss";
import OneArticle from "./OneArticle";
import { Box } from "@mui/material";
import SearchBar from "./SearchBar";

export default function Layout() {
  return (
    <Box className="articleDisplayContainer">
      <SearchBar />
      <Box className="articleMasterContainer">
        <OneArticle />
        <OneArticle />
        <OneArticle />
        <OneArticle />
      </Box>
    </Box>
  );
}
