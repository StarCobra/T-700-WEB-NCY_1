import bcrypt from "bcryptjs";

const bcrypt = require("bcryptjs");

passport.use(
  new LocalStrategy((username, password, done) => {
    // Find the user with the given username
    const query = `SELECT * FROM users WHERE username = ?;`;
    const values = [username];

    db.query(query, values, (err, results) => {
      if (err) {
        return done(err);
      }

      if (results.length > 0) {
        // Utilisateur trouvé
        const user = results[0];

        // Comparer le mot de passe fourni avec le mot de passe hashé en base de données
        bcrypt.compare(password, user.user_password, (bcryptErr, isMatch) => {
          if (bcryptErr) {
            return done(bcryptErr);
          }

          if (isMatch) {
            // Mot de passe correct, authentification réussie
            delete user.user_password;
            return done(null, user);
          } else {
            // Mot de passe incorrect
            return done(null, false, { message: "Authentication failed" });
          }
        });
      } else {
        // Aucun utilisateur trouvé avec ce nom d'utilisateur
        return done(null, false, { message: "Authentication failed" });
      }
    });
  })
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const query = `SELECT * FROM users WHERE id = ?;`;
  const values = [id];
  db.query(query, values, (err, results) => {
    if (err) {
      return done(err);
    }

    if (results.length > 0) {
      const user = results[0];
      return done(null, user);
    } else {
      return done(null, false, { message: "User not found" });
    }
  });
});
