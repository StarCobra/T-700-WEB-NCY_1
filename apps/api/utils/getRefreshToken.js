import { createDatabase } from "../database/create.js";
import jwt from "jsonwebtoken";

export async function getRefreshToken(token) {

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

            return { refreshToken: refreshToken, user: user }
        }       

    } catch(error) {
        throw new Error(error);
    }
}