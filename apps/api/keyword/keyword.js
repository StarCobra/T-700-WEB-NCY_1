import express from "express";
import dotenv from "dotenv";
import { createDatabase } from "../database/create.js";
import { isAdmin, verifyToken } from "../middleware/authentication.js";

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

router.post("/", verifyToken, isAdmin, async (req, res) => {
  const keyword = req.body.keyword;

  try {
    const pool = await createDatabase();
    const connection = await pool.getConnection();
    await connection.query("INSERT INTO keyword (name) VALUES (?)", [
      keyword.name,
    ]);

    res.status(201).send(`The keyword : ${keyword.name} has been added`);
  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
});

router.get("/", verifyToken, async (req, res) => {
  const only_trashed = req.query.only_trashed;
  try {
    const pool = await createDatabase();
    const connection = await pool.getConnection();

    let query;
    if (only_trashed === "true") {
      query = `SELECT id, name FROM keyword WHERE deleted_at IS NOT NULL;`;
    } else {
      query = `SELECT id, name FROM keyword WHERE deleted_at IS NULL;`;
    }
    const results = await connection.query(query);

    let keywords = [];

    if (results.length > 0) {
      keywords = results;
    }

    res.status(200).send({ data: keywords });
  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
});

router.patch("/:keyword_id/restore", verifyToken, isAdmin, async (req, res) => {
  const keyword_id = req.params.keyword_id;

  if (keyword_id) {
    try {
      const pool = await createDatabase();
      const connection = await pool.getConnection();
      const query = "UPDATE keyword SET deleted_at = ? WHERE id = ?";
      const params = [null, keyword_id];
      await connection.query(query, params);

      res.status(201).send(`The keyword is restored`);
    } catch (error) {
      res.status(500).send({ message: error + "Internal server error" });
    }
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

      await connection.query("UPDATE keyword SET deleted_at = ? WHERE id = ?", [
        formattedDate,
        cmid,
      ]);
      res.status(201).send(`The keyword : ${cmid} has been deleted`);
    } else {
      res.status(400).send({ message: "Error parameters" });
    }
  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
});

export default router;
