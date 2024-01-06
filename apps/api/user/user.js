import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import "./auth-basic.js";
import { createDatabase } from "../database/create.js";
import dotenv from "dotenv";
import { verifyToken, isAdmin } from "../middleware/authentication.js";

const router = express.Router();

dotenv.config();

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, User-Info');
  next();
});

router.post("/register", async (req, res) => {
  try {
    // Get user data
    let user = req.body.user;

    // Hash password
    const salt_rounds = 10;
    const salt = await bcrypt.genSaltSync(salt_rounds);
    const hash = await bcrypt.hashSync(user.password, salt);

    // Save user in database
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

    // Send response successful
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
      redirectUrl: "/",
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
  // Renvoyez une réponse indiquant que la déconnexion est réussie
  res.status(200).json({ message: "Logout successful", redirectUrl: "/" });
});

// Route pour gérer l'échec d'authentification côté serveur
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



router.delete("/keywords", verifyToken, async(req,res) => {
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

      const keywordsString = favorite_keywords.map(keyword => keyword.keyword).join(',');

      res.status(201).send(`Keywords : ${keywordsString} have been deleted of your favorites`);
      
      
    } catch (error) {

      res.status(500).send({ message: error + "Internal server error" });

    }

  }
})

router.post("/keywords", verifyToken, async (req, res) => {
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

      res.status(201).send(`Keywords : ${keywordsString} have been added in your favorite`);
      
      
    } catch (error) {

      res.status(500).send({ message: error + "Internal server error" });

    }

  }
})

router.get("/profile", verifyToken, (req, res) => {
  res.status(200).json({ user: req.user });
});

router.put("/profile", verifyToken, function (req, res) {

  let user_edit_informations = req.body; // list cryptos, list keywords

  if (user_edit_informations.list_crypto.is_change) {
    user_edit_informations.list_crypto.forEach((crypto) => {

      if (crypto.is_add) {
        const query = `INSERT INTO chosen_crypto (crypto_id, user_id) VALUES (?,?);`;
        db.query(query, [crypto.id, req.user.id], (err, insertResult) => {
          if (err) {
            res.status(500).send({ message: "Error database" });
          }
        });
      }
      if (crypto.is_delete) {
        const query = `DELETE FROM chosen_crypto WHERE crypto_id = ? AND user_id = ?`;
        db.query(query, [crypto.id, req.user.id], (err, insertResult) => {
          if (err) {
            res.status(500).send({ message: "Error database" });
          }
        });
      }

    });
  }

  if (user_edit_informations.list_keywords.is_change) {
    user_edit_informations.list_keywords.forEach((keyword) => {
      if (keyword.is_add) {

        const query = `INSERT INTO favorite_keywords (keyword_id, user_id) VALUES (?,?);`;
        db.query(query, [keyword.id, req.user.id], (err, insertResult) => {
          if (err) {
            res.status(500).send({ message: "Error database" });
          }
        });
      }

      if (keyword.is_delete) {
        const query = `DELETE FROM favorite_keywords WHERE keyword_id = ? AND user_id = ?`;
        db.query(query, [keyword.id, req.user.id], (err, insertResult) => {
          if (err) {
            res.status(500).send({ message: "Error database" });
          }
        });
      }
    });
  }

  if (user_edit_informations.user.is_change) {
    const user_infos = user_edit_informations.user;

    let query_user = "";
    let query_params = [];

    // Construire la query et le tableau de paramètres pour la query
    for (const key in user_infos) {
      if (Object.hasOwnProperty.call(user_infos, key)) {

        query_user += key + " = " + " ?,"
        query_params.push(user_infos[key])
        
      }
    }

    // Enlever la dernière virgule
    query_user = query_user.slice(0, -1);

    // Ajouter l'id du user en dernier paramètre
    query_params.push(req.user.id)

    const query = "UPDATE user SET " + query_user + " WHERE id = ?";
    db.query(
      query,
      query_params,
      (err, insertResult) => {
        if (err) {
          res.status(500).send({ message: "Error database" });
        }
      }
    );
  }
    
  

  res.status(200).json();
});

export default router;
