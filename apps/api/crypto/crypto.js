import express from "express";
import { verifyToken, isAdmin } from "../middleware/authentication.js";
import { createDatabase } from "../database/create.js";
import dotenv from "dotenv";

const router = express.Router();

dotenv.config();

router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Content-Type, Accept, Content-Type, Authorization",
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

router.get("/", async (req, res) => {
  const cmids = req.query.cmids;

  if (cmids) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${cmids}&x_cg_demo_api_key=${process.env.SECRET_API_KEY}`,
    );
    const json = await response.json();

    const transformedData = await transformJSON(json);

    res.status(200).send({ data: transformedData });
  } else {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&x_cg_demo_api_key=${process.env.SECRET_API_KEY}`,
    );
    const json = await response.json();

    const transformedData = await transformJSON(json);

    res.status(200).send({ data: transformedData });
  }
});

router.get("/internal", verifyToken, async (req, res) => {
  const only_trashed = req.query.only_trashed;
  try {
    const pool = await createDatabase();
    const connection = await pool.getConnection();

    let query;
    if (only_trashed === "true") {
      query = `SELECT id, name, short_name, image, deleted_at FROM crypto WHERE deleted_at IS NOT NULL;`;
    } else {
      query = `SELECT id, name, short_name, image, deleted_at FROM crypto WHERE deleted_at IS NULL;`;
    }

    const results = await connection.query(query);

    let cryptos = [];

    if (results.length > 0) {
      cryptos = results;
    }

    res.status(200).send({ data: cryptos });
  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
});

router.delete("/:cmid", verifyToken, isAdmin, async (req, res) => {
  try {
    const cmid = req.params.cmid;

    if (cmid) {
      const pool = await createDatabase();
      const connection = await pool.getConnection();

      const currentDate = new Date();

      const formattedDate = currentDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      await connection.query("UPDATE crypto SET deleted_at = ? WHERE id = ?", [
        formattedDate,
        cmid,
      ]);
      res.status(201).send(`The crypto : ${cmid} has been deleted`);
    } else {
      res.status(400).send({ message: "Error parameters" });
    }
  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
});

router.get("/:cmid/history/:period", async (req, res) => {
  try {
    let limit;

    const cmid = req.params.cmid;
    let period = req.params.period;

    switch (period) {
      case "daily":
        period = "day";
        limit = 60;
        break;
      case "hourly":
        period = "hour";
        limit = 48;
        break;
      case "minute":
        limit = 60;
        break;
      default:
        console.error("Unrecognized period");
        return;
    }

    const url = `https://min-api.cryptocompare.com/data/v2/histo${period}?fsym=${cmid}&tsym=USD&limit=${limit}&api_key=${process.env.SECRET_API_KEY_CRYPTO_COMPARE}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error request : ${response.statusText}`);
    }

    const priceHistory = await response.json();

    const priceHistoryData = priceHistory.Data.Data;

    const priceHistoryFormatted = await formatHistoryPrice(priceHistoryData);

    res.status(200).send({ data: priceHistoryFormatted });
  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
});

router.patch("/:crypto_id/restore", verifyToken, isAdmin, async (req, res) => {
  const crypto_id = req.params.crypto_id;

  if (crypto_id) {
    try {
      const pool = await createDatabase();
      const connection = await pool.getConnection();
      const query = "UPDATE crypto SET deleted_at = ? WHERE id = ?";
      const params = [null, crypto_id];
      await connection.query(query, params);

      res.status(201).send(`The crypto is restored`);
    } catch (error) {
      res.status(500).send({ message: error + "Internal server error" });
    }
  }
});

router.post("/", verifyToken, isAdmin, async (req, res) => {
  const crypto = req.body.crypto;

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${crypto.name}&x_cg_demo_api_key=${process.env.SECRET_API_KEY}`,
    );

    if (response.ok) {
      const pool = await createDatabase();
      const connection = await pool.getConnection();
      await connection.query(
        "INSERT INTO crypto (name, short_name, image) VALUES (?, ?, ?)",
        [crypto.name, crypto.short_name, crypto.image],
      );

      res.status(201).send(`The crypto : ${crypto.name} has been added`);
    }
  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
});

router.get("/:cmid", verifyToken, async (req, res) => {
  const cmid = req.params.cmid;

  if (cmid) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${cmid}&x_cg_demo_api_key=${process.env.SECRET_API_KEY}`,
    );
    const json = await response.json();

    const transformedData = transformJSON(json);

    res.status(200).send({ data: transformedData });
  } else {
    res.status(500).send({ error: "Error parameters" });
  }
});

function formatHistoryPrice(prices) {
  if (!Array.isArray(prices)) {
    return {
      error: "API error",
    };
  }

  const priceHistoryFormatted = prices.map((price) => ({
    time: price.time,
    opening: price.open,
    highest: price.high,
    lowest: price.low,
    close: price.close,
  }));

  return priceHistoryFormatted;
}

function transformJSON(json) {
  if (!Array.isArray(json)) {
    return {
      error: "API error",
    };
  }

  const transformedData = json.map((crypto) => ({
    id: crypto.id,
    name: crypto.name,
    short_name: crypto.symbol,
    change_price_day: crypto.price_change_24h,
    current_price: crypto.current_price,
    highest_price_day: crypto.high_24h,
    lowest_price_day: crypto.low_24h,
    updated_at: crypto.last_updated,
    image: crypto.image,
  }));

  return transformedData;
}

export default router;
