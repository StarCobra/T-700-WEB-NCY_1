import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { createDatabase } from "../database/create.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "api.count-of-money.local:3005/users/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      // Recherche ou création d'un utilisateur dans la base de données
      const query = `SELECT * FROM user INNER JOIN provider ON provider.id = user.provider_id WHERE provider.name = 'google' AND user.provider_id = ?;`;
      const values = [profile.id];

      try {
        const pool = await createDatabase();
        const connection = await pool.getConnection();
        const results = await connection.query(query, values);

        if (results.length > 0) {
          // Utilisateur trouvé, mise à jour des informations
          const user = results[0];
          user.name = profile.displayName;

          db.query("UPDATE user SET name = ?, email = ? WHERE id = ?", [
            user.name,
            user.mail,
            user.id,
          ]);
          return done(null, user);
        } else {
          // Utilisateur non trouvé, création d'un nouvel utilisateur
          const newUser = {
            provider_name: "google",
            provider_id: profile.id,
            name: profile.displayName,
            mail: profile.emails[0].value,
            birth_date: new Date(profile._json.birthday).toString(),
          };

          const insertQuery = `INSERT INTO user (provider_name, provider_id, mail, name, birth_date) VALUES (?, ?, ?, ?, ?);`;
          const result = await connection.query(insertQuery, [
            newUser.provider_name,
            newUser.provider_id,
            newUser.mail,
            newUser.name,
            newUser.birth_date,
          ]);

          newUser.id = result.insertId;
          return done(null, newUser);
        }
      } catch (error) {
        return done(error);
      }
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
