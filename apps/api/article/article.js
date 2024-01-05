import express from "express";
import { promisify } from "util";
import { parseString } from "xml2js";
import { verifyToken } from "../middleware/authentication.js";

const router = express.Router();
const parseStringPromisified = promisify(parseString);

router.get("/", verifyToken, async (req, res) => {
  const rss = "https://cointelegraph.com/rss";

  try {
    const response = await fetch(rss);
    const responseText = await response.text();
    const result = await parseStringPromisified(responseText);
    const articles = result.rss.channel[0].item;

    if (req.user && req.params) {
      const params = req.params.split(",");
      let filteredArticles = articles.filter((item) =>
        params.some(
          (param) =>
            item.title[0].toLowerCase().includes(param) ||
            item.description[0].toLowerCase().includes(param),
        ),
      );

      res
        .status(200)
        .header("Access-Control-Allow-Origin", "*")
        .send({ data: filteredArticles });
    } else {
      res
        .status(200)
        .header("Access-Control-Allow-Origin", "*")
        .send({ data: articles });
    }
  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
});

router.get("/:title", async (req, res) => {
  const rss = "https://cointelegraph.com/rss";
  const title = decodeURIComponent(req.params.title).trim();

  try {
    const response = await fetch(rss);
    const responseText = await response.text();

    const result = await parseStringPromisified(responseText);
    const articles = result.rss.channel[0].item;

    const targetArticle = articles.find((article) => {
      const articleTitle = article.title[0].trim();
      return articleTitle.includes(title);
    });

    if (targetArticle) {
      res.status(200).send({ data: targetArticle });
    } else {
      res.status(200).send({ data: {} });
    }
  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
});

export default router;
