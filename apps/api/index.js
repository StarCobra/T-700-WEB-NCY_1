import express from "express";
import passport from "passport";
import userRoutes from "./user/user.js";
import cryptoRoutes from "./crypto/crypto.js";
import articleRoutes from "./article/article.js"
import dotenv from "dotenv";

const app = express();
const port = 3005;

dotenv.config();

app.use(express.json());
app.use(passport.initialize());

app.use("/users", userRoutes);
app.use("/cryptos", cryptoRoutes);
app.use("/articles", articleRoutes);

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
