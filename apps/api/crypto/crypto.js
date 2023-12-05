import express from "express";
import { verifyToken, isAdmin } from "../middleware/authentication.js";
import { createDatabase } from "../database/create.js";
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

router.post("/", verifyToken, isAdmin, async (req, res) => {
  // User MUST be logged in as well as the ADMINISTRATOR. Add a cryptocurrency to your plat-form.
  // A form must be attached to the request and contain at least the cryptocurrency code,
  // their full name and a URL for the image to which it represents
  try {
    const crypto = req.body.crypto;
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    await connection.query(
      "INSERT INTO crypto (id, name, image) VALUES (?, ?, ?)",
      [crypto.id, crypto.name, crypto.image]
    );

    res.status(201).send("The crypto has been added");
  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
});

router.get("/:cmid", verifyToken, async (req, res) => {
  const cmid = req.params.cmid;

  if (cmid) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${cmid}`
    );
    const json = await response.json();

    const transformedData = transformJSON(json);

    res.status(200).send({ data: transformedData });
  } else {
    res.status(500).send({ message: "Error parameters" });
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
