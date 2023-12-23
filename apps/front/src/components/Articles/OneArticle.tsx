import React from "react";
import "../../style/article.scss";
import articleExample from "../../assets/articles/articleExample.jpg";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function OneArticle() {
  return (
    <Box className="articleSample">
      <Box className="articleThumbnail">
        <img src={articleExample} />
      </Box>

      <Box className="articleSampleContent">
        <Box className="articleTitle">
          <h3>Bitcoin Collapse</h3>
        </Box>

        <Box className="articleSampleContent">
          <p>
            In recent times, the once-revered and volatile king of
            cryptocurrencies, Bitcoin, has experienced a notable decline,
            leaving investors and enthusiasts puzzled. This downturn questions
            about the long-term sustainability of the digital currency and its
            ever-evolving landscape of finance and technology.
          </p>
        </Box>

        <Box className="articleDateSample">
          <h4>November 13, 2023</h4>
        </Box>

        <Box className="seeMore">
          <Link to="/articles/1" className="Menu" id="menu1">Click here to see more ...</Link>
        </Box>
      </Box>
    </Box>
  );
}
