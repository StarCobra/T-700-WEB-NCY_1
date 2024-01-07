import bcrypt from "bcryptjs";
import passport from "passport";
import jwt from "jsonwebtoken";
import { Strategy as LocalStrategy } from "passport-local";
import { createDatabase } from "../database/create.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
      session: false,
    },
    async (req, email, password, done) => {
      try {
        const pool = await createDatabase();
        const connection = await pool.getConnection();

        const query = `SELECT id, email, first_name, last_name, password, birth_date, image, roles FROM user WHERE email = ?;`;
        const value = [email];
        const results = await connection.query(query, value);

        if (results.length > 0) {
          const user = results[0];

          const isMatch = await bcrypt.compare(password, user.password);

          if (isMatch) {
            const query2 = `SELECT keyword.id, name FROM keyword INNER JOIN favorite_keywords ON favorite_keywords.keyword_id = keyword.id
            INNER JOIN user ON user.id = favorite_keywords.user_id WHERE favorite_keywords.user_id = ? AND keyword.deleted_at IS NULL;`;
            const value2 = [user.id];
            const keywords = await connection.query(query2, value2);

            if (keywords.length > 0) {
              user.favorite_keywords = keywords.map((item) => ({
                id: item.id,
                name: item.name,
              }));
            }

            const query3 = `SELECT crypto.id, crypto.name, crypto.short_name FROM crypto INNER JOIN favorite_cryptos ON favorite_cryptos.crypto_id = crypto.id 
            WHERE favorite_cryptos.user_id = ? AND crypto.deleted_at IS NULL;`;
            const value3 = [user.id];
            const cryptos = await connection.query(query3, value3);

            if (cryptos.length > 0) {
              user.favorite_cryptos = cryptos.map((item) => ({
                id: item.id,
                crypto: item.name,
              }));
            }

            delete user.password;

            const token = jwt.sign(user, process.env.SECRET_KEY_JWT, {
              expiresIn: "1h",
            });

            const query4 = `UPDATE user SET token = ? WHERE id = ?`;
            const values4 = [token, user.id];
            await connection.query(query4, values4);
            return done(null, token);
          } else {
            return done(null, false, { message: "Authentication failed" });
          }
        } else {
          return done(null, false, { message: "Authentication failed" });
        }
      } catch (error) {
        return done(error);
      }
    },
  ),
);
