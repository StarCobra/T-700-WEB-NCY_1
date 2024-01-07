import React from "react";
import "../../../style/article.scss";
import { Box } from "@mui/material";

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
      <Box className="contentContainer">
        <h3>Concerns:</h3>

        <ul>
          {article?.category?.map((concern: any, index: number) => (
            <li key={index}>{concern}</li>
          ))}
        </ul>
      </Box>

      <Box>
        <h3>Description:</h3>

        <p>{descriptionText}</p>
      </Box>

      <a href={article?.link} target="_blank" rel="noreferrer">
        Source
      </a>
    </Box>
  );
}
