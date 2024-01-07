import React from "react";
import "../../style/article.scss";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useArticle } from "../../Context/ArticleProvider";

export default function OneArticle(props: any) {
  const { article } = props;

  const { setArticle } = useArticle();

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
    <Box className="articleSample">
      <Box className="articleThumbnail">
        <img src={article?.enclosure?.[0]?.$?.url} alt="" />
      </Box>

      <Box className="articleSampleContent">
        <Box className="articleTitle">
          <h3>{article?.title}</h3>
        </Box>

        <Box className="articleSampleContent">{descriptionText}</Box>

        <Box className="articleDateSample">
          <h4>{dayjs(article?.pubDate).format("dddd DD MMMM YYYY")}</h4>
        </Box>

        <Box className="seeMore">
          <Link
            to={`/articles/${article?.title}`}
            className="Menu"
            id="menu1"
            onClick={() => setArticle(article)}
          >
            Click here to see more ...
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
