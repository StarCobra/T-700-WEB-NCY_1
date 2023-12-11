import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";
import { Strategy as LocalStrategy } from "passport-local";
import { createDatabase } from "../database/create.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
      session: false, // Désactive la gestion de session
    },
    async (req, username, password, done) => {
      // Find the user with the given username
      const query = `SELECT * FROM user WHERE name = ?;`;
      const values = [username];

      try {
        const pool = await createDatabase();
        const connection = await pool.getConnection();
        const results = await connection.query(query, values);

        if (results.length > 0) {
          // Utilisateur trouvé
          const user = results[0];

          // Comparer le mot de passe fourni avec le mot de passe hashé en base de données
          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            // Mot de passe correct, authentification réussie
            delete user.password;
            const token = jwt.sign(user, process.env.SECRET_KEY_JWT, {
              expiresIn: "1h",
            });
            return done(null, token);
          } else {
            // Mot de passe incorrect
            return done(null, false, { message: "Authentication failed" });
          }
        } else {
          // Aucun utilisateur trouvé avec ce nom d'utilisateur
          return done(null, false, { message: "Authentication failed" });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
