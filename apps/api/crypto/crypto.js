import express from "express";
import { verifyToken, isAdmin } from "../middleware/authentication.js";
import { createDatabase } from "../database/create.js";
import dotenv from "dotenv";

const router = express.Router();

dotenv.config();

router.get("/", async (req, res) => {
  const cmids = req.query.cmids;

  if (cmids) {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${cmids}&x_cg_demo_api_key=${process.env.SECRET_API_KEY}`
    );
    const json = await response.json();
    
    const transformedData = await transformJSON(json);

    res.status(200).header('Access-Control-Allow-Origin', '*').send({ data: transformedData });
  } else {

    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&x_cg_demo_api_key=${process.env.SECRET_API_KEY}`
    );
    const json = await response.json();
    
    const transformedData = await transformJSON(json);

    res.status(200).header('Access-Control-Allow-Origin', '*').send({ data: transformedData });
  }
  
});

router.delete("/:cmid", verifyToken, isAdmin, async(req, res) => {
  // cmid: cryptocurrency Id. User MUST be logged in as well as the ADMINISTRATOR. Deletes
  // a cryptocurrency (meaning that your platform does not know this currency anymore.)
  try {
    const cmid = req.params.cmid;

    if(cmid) {
      const pool = await createDatabase();
      const connection = await pool.getConnection();

      const currentDate = new Date();

      // Format de date pour MySQL
      const formattedDate = currentDate.toISOString().slice(0, 19).replace('T', ' ');

      await connection.query("UPDATE crypto SET deleted_at = ? WHERE id = ?", [formattedDate,cmid]);
      res.status(201).send(`The crypto : ${cmid} has been deleted`);
    }
    else {
      res.status(400).send({message: "Error parameters"})
    }
  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
})

router.get("/:cmid/history/:period", verifyToken, async (req,res) => {
  // cmid: cryptocurrency Id. period: daily, hourly or minute. User MUST be logged in. Provides
  // the price history of a cryptocurrency. For each period:
  // – opening, highest, lowest and closing exchange rates
  // Depending on the periods, the history is shorter or longer:
  // – daily: Last 60 days, so 60 periods a day ;
  // – hourly: 48 last hours, so 48 periods of one hour ;
  // – minute: last 2 hours, so 60 periods of one minute.

})

router.patch("/:crypto_id/restore", verifyToken, isAdmin, async (req,res) => {
  const crypto_id = req.params.crypto_id

  if(crypto_id) {
    try {
      const pool = await createDatabase();
      const connection = await pool.getConnection();
      const query = "UPDATE crypto SET deleted_at = ? WHERE id = ?";
      const params = [null, crypto_id]
      await connection.query(query,params)

      res.status(201).send(`The crypto is restored`);
    } catch (error) {
      res.status(500).send({ message: error + "Internal server error" });
    }
  }
})

router.post("/", verifyToken, isAdmin, async (req, res) => {
  // User MUST be logged in as well as the ADMINISTRATOR. Add a cryptocurrency to your plat-form.
  // A form must be attached to the request and contain at least the cryptocurrency code,
  // their full name and a URL for the image to which it represents
    const crypto = req.body.crypto;

    try {

      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${crypto.id}&x_cg_demo_api_key=${process.env.SECRET_API_KEY}`
      );

      if(response.ok) {
        const pool = await createDatabase();
        const connection = await pool.getConnection();
        await connection.query(
          "INSERT INTO crypto (name, short_name, image) VALUES (?, ?, ?)",
          [crypto.name, crypto.short_name, crypto.image]
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
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&ids=${cmid}&x_cg_demo_api_key=${process.env.SECRET_API_KEY}`
    );
    const json = await response.json();

    const transformedData = transformJSON(json);

    res.status(200).send({ data: transformedData });
  } else {
    res.status(500).send({ error: "Error parameters" });
  }
  
});

function transformJSON(json) {

  if (!Array.isArray(json)) {
    return {
      error: "API error"
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
