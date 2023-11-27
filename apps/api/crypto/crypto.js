import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const cmids = req.query.cmids;

  if (cmids) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${cmids}`
    );
    const json = await response.json();

    res.status(200).send(json);
  } else {
    res.status(500).send({ message: "Parameters error" });
  }
});

export default router;
