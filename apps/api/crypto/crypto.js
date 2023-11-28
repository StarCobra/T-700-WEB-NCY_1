import express from "express";
const router = express.Router();

router.get("/", async (req, res) => {
  const cmids = req.query.cmids;

  if (cmids) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${cmids}`
    );
    const json = await response.json();
    const transformedData = await transformJSON(json);

    res.status(200).send({ data: transformedData });
  } else {
    res.status(500).send({ message: "Error parameters" });
  }
});

router.get("/:cmid", async (req, res) => {
  if (req.isAuthenticated()) {
    const cmid = req.params.cmid;

    if (cmid) {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${cmid}`
      );
      const json = await response.json();

      const transformedData = transformJSON(json);

      res.status(200).send({ data: transformedData });
    } else {
      res.status(500).send({ message: "Parameters error" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

function transformJSON(json) {
  const transformedData = json.map((crypto) => ({
    id: crypto.id,
    name: crypto.name,
    current_price: crypto.current_price,
    highest_price_day: crypto.high_24h,
    lowest_price_day: crypto.low_24h,
    image: crypto.image,
  }));

  return transformedData;
}

export default router;
