import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import "./auth-basic.js";
import { createDatabase } from "../database/create.js";
import dotenv from "dotenv";
import { verifyToken, isAdmin } from "../middleware/authentication.js";
import { getRefreshToken } from "../utils/getRefreshToken.js";

const router = express.Router();

dotenv.config();

router.post("/register", async (req, res) => {
  try {

    let user = req.body.user;

    const salt_rounds = 10;
    const salt = await bcrypt.genSaltSync(salt_rounds);
    const hash = await bcrypt.hashSync(user.password, salt);

    const pool = await createDatabase();
    const connection = await pool.getConnection();
    if(user.roles === "ADMIN") {
      await connection.query(
        "INSERT INTO user (email, last_name, first_name, password, birth_date, roles) VALUES (?, ?, ?, ?, ?, ?)",
        [user.email, user.last_name, user.first_name, hash, user.birth_date, "ADMIN"]
      );
    }
    else {
      await connection.query(
        "INSERT INTO user (email, last_name, first_name, password, birth_date) VALUES (?, ?, ?, ?, ?)",
        [user.email, user.last_name, user.first_name, hash, user.birth_date]
      );
    }

    res.status(201).send("The user has been registered");

  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
});

router.post(
  "/login",
  passport.authenticate("local", {
    // failureRedirect: "/login-failed",
    session: false,
  }),
  (req, res) => {
    res.status(200).json({
      message: "Successful authentication",
      token: `Bearer ${req.user}`,
    });
  }
);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "email",
      "profile",
      "openid",
      "https://www.googleapis.com/auth/user.birthday.read",
    ],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failed" }),
  function (req, res) {
    res.status(200).send({ data: req.user });
    // res.redirect("/");
  }
);

router.post("/logout", verifyToken, (req, res) => {

  res.status(200).json({ message: "Logout successful" });

});

router.get("/login-failed", (req, res) => {
  res.redirect("/users/login?error=auth_failed");
});

router.patch("/keywords/:keyword_id/restore", verifyToken, isAdmin, async(req,res) => {
  const keyword_id = req.params.keyword_id

  if(keyword_id) {

    try {
      const pool = await createDatabase();
      const connection = await pool.getConnection();
      const query = "UPDATE keyword SET deleted_at = ? WHERE id = ?";
      const params = [null, keyword_id]
      await connection.query(query,params)

      res.status(201).send(`The keyword is restored`);
    } catch (error) {
      res.status(500).send({ message: error + "Internal server error" });
    }
    
  }
})

router.patch("/cryptos/:crypto_id/restore", verifyToken, isAdmin, async(req,res) => {
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

router.delete("/keywords/favorite", verifyToken, async(req,res) => {
  const user_id = req.user.id;

  if(user_id) {

    const favorite_keywords = req.body.favorite_keywords;

    try {

      const pool = await createDatabase();
      const connection = await pool.getConnection();

      if(favorite_keywords) {

        favorite_keywords.forEach(async (keyword) => {

          const query = "DELETE FROM favorite_keywords WHERE user_id = ? AND keyword_id = ?";
          const params = [user_id, keyword.id]
          await connection.query(query,params)

        });
      }

      const keyword_string = favorite_keywords.map(keyword => keyword.keyword).join(',');

      const data = await getRefreshToken(req.token)

      res.status(201).setHeader("Authorization", `Bearer ${data.refreshToken}`).send(`Keywords : ${keyword_string} have been deleted of your favorites`);
      
      
    } catch (error) {

      res.status(500).send({ message: error + "Internal server error" });

    }

  }
})

router.delete("/cryptos/favorite", verifyToken, async(req,res) => {
  const user_id = req.user.id

  if(user_id) {
    const favorite_cryptos = req.body.favorite_cryptos;

    try {

      const pool = await createDatabase();
      const connection = await pool.getConnection();

      if(favorite_cryptos) {

        favorite_cryptos.forEach(async (crypto) => {

          const query = "DELETE FROM favorite_cryptos WHERE user_id = ? AND crypto_id = ?";
          const params = [user_id, crypto.id]
          await connection.query(query,params)

        });
      }

      const crypto_string = favorite_cryptos.map(crypto => crypto.name).join(',');

      const data = await getRefreshToken(req.token)

      res.status(201).setHeader("Authorization", `Bearer ${data.refreshToken}`).send(`Cryptos : ${crypto_string} have been deleted in your favorite`);

    } catch (error) {
      res.status(500).send({ message: error + "Internal server error" });
    }

  }
})

router.post("/cryptos/favorite", verifyToken, async (req, res) => {
  const user_id = req.user.id;

  if(user_id) {
    const favorite_cryptos = req.body.favorite_cryptos;

    try {
      const pool = await createDatabase();
      const connection = await pool.getConnection();

      if(favorite_cryptos) {
        favorite_cryptos.forEach(async (crypto) => {

          const query = "INSERT INTO favorite_cryptos (user_id, crypto_id) VALUES (?,?)";
          const params = [user_id, crypto.id]
          await connection.query(query,params)
      
        });
      }

      const crypto_string = favorite_cryptos.map(crypto => crypto.name).join(',');

      const data = await getRefreshToken(req.token)

      res.status(201).setHeader("Authorization", `Bearer ${data.refreshToken}`).send(`Cryptos : ${crypto_string} have been added in your favorite`);

    } catch (error) {
      res.status(500).send({ message: error + " Internal server error" });
    }
  }
})

router.post("/keywords/favorite", verifyToken, async (req, res) => {
  const user_id = req.user.id;

  if(user_id) {

    const favorite_keywords = req.body.favorite_keywords;

    try {

      const pool = await createDatabase();
      const connection = await pool.getConnection();

      if(favorite_keywords) {
        favorite_keywords.forEach(async (keyword) => {

          const query = "INSERT INTO favorite_keywords (user_id, keyword_id) VALUES (?,?)";
          const params = [user_id, keyword.id]
          await connection.query(query,params)
      
        });
      }

      const keywordsString = favorite_keywords.map(keyword => keyword.keyword).join(',');

      const data = await getRefreshToken(req.token)

      res.status(201).setHeader("Authorization", `Bearer ${data.refreshToken}`).send(`Keywords : ${keywordsString} have been added in your favorite`);
      
      
    } catch (error) {

      res.status(500).send({ message: error + "Internal server error" });

    }

  }
})

router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.put("/profile", verifyToken, async (req, res) => {

  const user_edit_informations = req.body;

  if (user_edit_informations.is_change) {

    try {
      const pool = await createDatabase();
      const connection = await pool.getConnection();

      const user_infos = user_edit_informations.user;

      let query_user = "";
      let query_params = [];

      for (const key in user_infos) {
        if (Object.hasOwnProperty.call(user_infos, key)) {

          query_user += key + " = " + "?,"
          query_params.push(user_infos[key])
          
        }
      }

      query_user = query_user.slice(0, -1);
      query_params.push(req.user.id)

      const query = "UPDATE user SET " + query_user + " WHERE id = ?";
      await connection.query(query,query_params)

      const data = await getRefreshToken(req.token)

      res.status(200).setHeader("Authorization", `Bearer ${data.refreshToken}`).send("Your profile has been modified");

    } catch (error) {
      res.status(500).send({ message: error + "Internal server error" });
    }
    
  }

  
});

export default router;
