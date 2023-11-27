const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const session = require("express-session");

// Importez les modules nécessaires depuis votre base de données (db)
// Assurez-vous que votre base de données est correctement configurée
// const db = require("./path-to-your-db-module");

// Importez les fichiers d'authentification
require("./auth-google");
require("./auth-basic");

const app = express();
const port = 3000;

app.use(express.json());

// Middleware pour la gestion des sessions
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
    // Obtenez les données de l'utilisateur
    let user = req.body.user;

    // Hachez le mot de passe
    const salt_rounds = 10;
    const salt = await bcrypt.genSaltSync(salt_rounds);
    await bcrypt.hashSync(user.password, salt);
// Enregistrez l'utilisateur dans la base de données

    // Envoyez une réponse de succès
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

// (À REVOIR) Renvoi d'une réponse avec un status 200 pour indiquer une mise à jour
app.put("/users/profile", function (req, res) {
  if (req.isAuthenticated()) {
// list cryptos, list keywords, u

    // ... Le reste de votre logique de mise à jour ...

    res.status(200).json();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
