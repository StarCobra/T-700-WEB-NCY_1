import React from "react";
import "../../../style/article.scss";
import { Box } from "@mui/material";
import Content from "../../Content";

export default function ArticleContent() {
  return (
    <Box className="fullArticleContent">
      <Content content={"LOREM IPSUM"} />

      <Content title={"Regulatory Challenges:"} content={"LOREM IPSUM"} />

      <Content title={"Environmental Concerns:"} content={"LOREM IPSUM"} />

      <Content title={"Technological Challenges:"} content={"LOREM IPSUM"} />

      <Content title={"Market Volatility:"} content={"LOREM IPSUM"} />

      <Content title={"Conclusion:"} content={"LOREM IPSUM"} />
    </Box>
  );
}
