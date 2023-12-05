import express from "express";
import passport from "passport";
import bcrypt from "bcryptjs";
import "./auth-basic.js";
import { createDatabase } from "../database/create.js";
import dotenv from "dotenv";
import { verifyToken } from "../middleware/authentication.js";

const router = express.Router();

dotenv.config();

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
    await connection.query(
      "INSERT INTO user (name, password, birth_date, roles) VALUES (?, ?, ?, ?)",
      [user.username, hash, user.birth_date, user.role]
    );
    await connection.query(
      "INSERT INTO user (name, password, birth_date) VALUES (?, ?, ?)",
      [user.username, hash, user.birth_date]
    );

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

router.get("/profile", verifyToken, (req, res) => {
  console.log(req.user);
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
  } else {
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
    } else {
      if (user_edit_informations.user.is_change) {
        const user = user_edit_informations.user;
        const query = `UPDATE users SET username = ?, user_email = ? WHERE user_id = ?`;
        db.query(
          query,
          [user.username, user.user_email, req.user.id],
          (err, insertResult) => {
            if (err) {
              res.status(500).send({ message: "Error database" });
            }
          }
        );
      }
    }
  }

  res.status(200).json();
});

export default router;
