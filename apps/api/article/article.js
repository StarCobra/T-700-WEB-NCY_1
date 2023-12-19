import express from "express";
import { parseString } from "xml2js";
import { verifyToken } from "../middleware/authentication.js";
const router = express.Router();


router.get("/", verifyToken, async (req, res) => {
    const rss = "https://cointelegraph.com/rss";

    try {
        const response = await fetch(rss);
        const responseText = await response.text();

        parseString(responseText, async (err, result) => {
            const articles = result.rss.channel[0].item;
            
            if(req.user && req.params) {
                const params = req.params.split(",");
                let filteredArticles = articles;
                filteredArticles = articles.filter((item) =>
                    params.some(param =>
                        item.title[0].toLowerCase().includes(param) || item.description[0].toLowerCase().includes(param)
                    )
                );

                res.status(200).send({ data: filteredArticles });
            }
            else {
                res.status(200).send({ data: articles });
            }


        });
    } catch (error) {
        res.status(500).send({ message: error + "Internal server error" });
    }
});


export default router;