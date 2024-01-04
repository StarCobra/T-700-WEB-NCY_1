import jwt from "jsonwebtoken";
import { createDatabase } from "../database/create.js";

export function verifyToken(req, res, next) {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  const queryParams = req.query.params;

  if (!token && !req.originalUrl.startsWith('/articles')) {
    return res.status(401).json({ message: "Token non fourni" });
  }

  if(!token && req.originalUrl.startsWith('/articles')) {
    req.user = null;
    req.params = null;
    return next();
  }

  jwt.verify(token, process.env.SECRET_KEY_JWT, async (err, user) => {

    if (err) {
      if (err.name === "TokenExpiredError") {
        
        try {
          const pool = await createDatabase();
          const connection = await pool.getConnection();


          const query = `SELECT id, email, first_name, last_name, birth_date, image, roles FROM user WHERE token = ?;`;
          const value = [token];
          const results = await connection.query(query, value);

          if(results.length > 0) {

            const user = results[0];

            const query2 = `SELECT keyword.id, keyword FROM keyword INNER JOIN favorite_keywords ON favorite_keywords.keyword_id = keyword.id
            INNER JOIN user ON user.id = favorite_keywords.user_id WHERE favorite_keywords.user_id = ?`;
            const value2 = [user.id];
            const keywords = await connection.query(query2, value2);


            if(keywords.length > 0) {
              user.favorite_keywords = keywords.map(item => ({id: item.id, keyword: item.keyword}));
            }

            const query3 = `SELECT crypto.id, crypto.name FROM crypto INNER JOIN favorite_cryptos ON favorite_cryptos.crypto_id = crypto.id 
            WHERE favorite_cryptos.user_id = ?;`;
            const value3 = [user.id]
            const cryptos = await connection.query(query3, value3);

            if(cryptos.length > 0) {
              user.favorite_cryptos = cryptos.map(item => ({id: item.id, crypto: item.name}));
            }
            

            const refreshToken = jwt.sign(user, process.env.SECRET_KEY_JWT, {
              expiresIn: "1h",
            });

            const query4 = `UPDATE user SET token = ? WHERE id = ?`;
            const values4 = [refreshToken, user.id];
            await connection.query(query4, values4);

            if (!refreshToken && !req.originalUrl.startsWith('/articles')) {
              return res.status(401).json({ message: "RefreshToken expiré" });
            }

            res.setHeader("Authorization", `Bearer ${refreshToken}`);

            req.user = user;
            req.params = queryParams;

            next();

          }
        } catch (error) {
          res.status(500).send({error: "Error with database"})
        }
       
      } else {
        return res.status(403).json({
          token: token,
          error: err,
          message: "Token non valide",
        });
      }
    } else {
        req.user = user;
        if(req.originalUrl.startsWith('/articles')) {
          req.params = queryParams;
        }
        
        next();
     
    }
  });
}

export function isAdmin(req, res, next) {
  const user = req.user;
  if (user.roles === "ADMIN") {
    next();
  } else {
    return res
      .status(403)
      .json({ message: "You aren't access to this ressource" });
  }
}
