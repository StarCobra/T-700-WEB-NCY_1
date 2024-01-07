import React from "react";
import "../../../style/article.scss";
import { Box } from "@mui/material";
import { Button } from "@mui/base";

export default function ArticleContent(props: any) {
  const { article } = props;

  const extractTextFromHTML = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");
    const secondParagraph = doc.querySelector("p:nth-child(2)");
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    return secondParagraph ? secondParagraph.textContent.trim() : "";
  };

  const descriptionText = extractTextFromHTML(article?.description);

  return (
    <Box className="fullArticleContent">
      <Box className="keywordsContainer">
        <h3>Keywords related:</h3>

        <ul>
          {article?.category?.map((concern: any, index: number) => (
            <li key={index}>{concern}</li>
          ))}
        </ul>
      </Box>

      <Box className="descriptionContainer">
        <h3>Description:</h3>

        <p>{descriptionText}</p>
      </Box>

      <Button className="sourceContainer">
        <a href={article?.link} target="_blank" rel="noreferrer">
          Read the full article
        </a>
      </Button>
    </Box>
  );
}
