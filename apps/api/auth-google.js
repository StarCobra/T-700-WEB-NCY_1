import passport from "passport";
import dotenv from "dotenv";
dotenv.config();
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/users/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // Recherche ou création d'un utilisateur dans la base de données
      const query = `SELECT * FROM users WHERE user_provider = 'google' AND user_provider_id = ?;`;
      const values = [profile.id];

      db.query(query, values, (err, results) => {
        if (err) {
          return done(err);
        }

        if (results.length > 0) {
          // Utilisateur trouvé, mise à jour des informations
          const user = results[0];
          user.username = profile.displayName;

          db.query(
            "UPDATE users SET username = ?, user_email = ? WHERE id = ?",
            [user.username, user.id]
          );
          return done(null, user);
        } else {
          // Utilisateur non trouvé, création d'un nouvel utilisateur
          const newUser = {
            provider: "google",
            provider_id: profile.id,
            username: profile.displayName,
            email: profile.emails[0].value,
            birth_date: new Date(profile._json.birthday),
          };

          const insertQuery = `INSERT INTO users (user_provider, user_provider_id, user_email, username, user_birth_date) VALUES (?, ?, ?, ?, ?);`;

          db.query(
            insertQuery,
            [
              newUser.provider,
              newUser.provider_id,
              newUser.email,
              newUser.username,
              newUser.birth_date,
            ],
            (err, insertResult) => {
              if (err) {
                return done(err);
              }

              newUser.id = insertResult.insertId;
              return done(null, newUser);
            }
          );
        }
      });
    }
  )
);

// Sérialisation de l'utilisateur pour la session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const query = "SELECT * FROM users WHERE id = ?";
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
