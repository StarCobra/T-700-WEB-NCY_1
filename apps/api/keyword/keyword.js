import express from "express";
import dotenv from "dotenv";
import { createDatabase } from "../database/create.js";
import { verifyToken } from "../middleware/authentication.js";

const router = express.Router();

dotenv.config();


router.get("/", verifyToken, async (req,res) => {
    try {
        const pool = await createDatabase();
        const connection = await pool.getConnection();
    
        const query = `SELECT id, keyword FROM keyword WHERE deleted_at IS NULL;`;
        const results = await connection.query(query);
    
        let keywords = []
    
        if(results.length > 0) {
          keywords = results;
        }
    
        res.status(200).send({ data: keywords })

    } catch (error) {
        res.status(500).send({ message: error + "Internal server error" });
    }
})

export default router;