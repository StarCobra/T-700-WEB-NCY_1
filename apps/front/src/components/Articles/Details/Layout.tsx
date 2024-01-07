import React from "react";
import "../../../style/article.scss";
import ArticleContent from "./ArticleContent";
import { Box, Button } from "@mui/material";
import { useArticle } from "../../../Context/ArticleProvider";
import { Link } from "react-router-dom";

export default function Layout() {
  const { currentArticle } = useArticle();
  console.log("currentArticle", currentArticle);
  return (
    <Box className="fullArticleDisplay">
      <Box className="articleHeader">
        <Box className="articleThumbnail">
          <img src={currentArticle?.enclosure?.[0]?.$?.url} alt="" />
        </Box>

        <Box className="articleTitleContainer">
          <Box className="title">
            <h3>{currentArticle?.title}</h3>
          </Box>

          <Box className="dateAndSource">
            <h4>{currentArticle?.["dc:creator"]}</h4>
          </Box>
        </Box>
      </Box>

      <ArticleContent article={currentArticle} />

      <Link className="backButton" to={"/articles"}>
        <Button>Back</Button>
      </Link>
    </Box>
  );
}
