import express from "express";
import session from "express-session";
import passport from "passport";
import userRoutes from "./user/user.js";
import cryptoRoutes from "./crypto/crypto.js";

const app = express();
const port = 3005;

app.use(express.json());

// Middlewares pour la gestion des sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use("/users", userRoutes);
app.use("/crypto", cryptoRoutes);

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
