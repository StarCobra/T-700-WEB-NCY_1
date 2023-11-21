import express from "express";
import bcrypt from "bcryptjs";
require("./auth-google");
require("./auth-basic");

const app = express();
const port = 3000;

app.use(express.json());

// Middlewares pour la gestion des sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.post("/users/register", async (req, res) => {
  try {
    // Get user data
    let user = req.body.user;

    // Hash password
    const salt_rounds = 10;
    const salt = await bcrypt.genSaltSync(salt_rounds);
    const hash = await bcrypt.hashSync(user.password, salt);

    // Save user in database

    // Send response successful
    res.status(201).send("The user has been registered");
  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
});

app.post(
  "/users/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failed",
  }),
  (req, res) => {
    res
      .status(200)
      .json({ message: "Successful authentication", redirectUrl: "/" });
  }
);

app.get(
  "/users/auth/google",
  passport.authenticate("google", {
    scope: [
      "email",
      "profile",
      "openid",
      "https://www.googleapis.com/auth/user.birthday.read",
    ],
  })
);

app.get(
  "/users/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failed" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.post("/users/logout", (req, res) => {
  // Vérifiez si l'utilisateur est connecté avant de le déconnecter
  if (req.isAuthenticated()) {
    // Utilisez la fonction de Passport pour déconnecter l'utilisateur
    req.logout();
    // Renvoyez une réponse indiquant que la déconnexion est réussie
    res.status(200).json({ message: "Logout successful", redirectUrl: "/" });
  } else {
    // Renvoyez une réponse indiquant que l'utilisateur n'est pas connecté
    res.status(401).json({ message: "User not authenticated" });
  }
});

// Route pour gérer l'échec d'authentification côté serveur
app.get("/login-failed", (req, res) => {
  res.redirect("/users/login?error=auth_failed");
});

app.get("/users/profile", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ user: req.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// (A REVOIR) Renvoi d'une réponse avec un status 200 pour indiquer une mise à jour
app.put("/users/profile", function (req, res) {
  if (req.isAuthenticated()) {
    let user_edit_informations = req.body; // list cryptos, list keywords, u

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
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
