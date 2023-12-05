import React from "react";
import "../../style/article.scss";
import articleExample from "../../assets/articles/articleExample.jpg";
import { Box, Link } from "@mui/material";

export default function OneArticle() {
  return (
    <Box className="articleSample">
      <Box className="articleThumbnail">
        <img src={articleExample} alt=""></img>
      </Box>

      <Box className="articleSampleContent">
        <Box className="articleTitle">
          <h3>Bitcoin Collapse</h3>
        </Box>

        <Box className="articleSampleContent">
          <p>
            In recent times, the once-revered and volatile king of cryptocurrencies, Bitcoin, has experienced a notable decline, leaving
            investors and enthusiasts puzzled. This downturn questions about the long-term sustainability of the digital currency and its
            ever-evolving landscape of finance and technology.
            <Link>Plus ....</Link>
          </p>
        </Box>

        <Box className="articleDateSample">
          <h4>November 13, 2023</h4>
        </Box>
      </Box>
    </Box>
  );
}
