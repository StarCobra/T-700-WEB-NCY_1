import React from "react";
import "../../../style/article.scss";
import ArticleContent from "./ArticleContent";
import { Box } from "@mui/material";
import articleExample from "../../../assets/articles/articleExample.jpg";

export default function Layout() {
  return (
    <Box className="fullArticleDisplay">
      <Box className="articleHeader">
        <Box className="articleThumbnail">
          <img src={articleExample} alt="" />
        </Box>

        <Box className="articleTitleContainer">
          <Box className="title">
            <h3>Bitcoin Collapse</h3>
          </Box>

          <Box className="dateAndSource">
            <h4>From ChatGPT the 2023-11-13</h4>
          </Box>
        </Box>
      </Box>

      <ArticleContent />
    </Box>
  );
}
