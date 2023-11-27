import bcrypt from "bcryptjs";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

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
  const query = `SELECT users.username, users.user_birth_date, users.user_email, crypto.crypto_id, crypto.crypto_name, keyword.keyword_id, keyword.keyword
  FROM users
  INNER JOIN chosen_cryptos ON users.user_id = chosen_cryptos.user_id
  INNER JOIN crypto ON chosen_crypto.crypto_id = crypto.crypto_id
  INNER JOIN favorite_keywords ON users.user_id = favorite_keywords.user_id
  INNER JOIN keyword ON favorite_keywords.keyword_id = keyword.keyword_id
  WHERE users.user_id = ?;`;
  db.query(query, [id], (err, results) => {
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
