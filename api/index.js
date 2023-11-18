import { test } from "./test.js";
import express from "express";
import bcrypt from "bcryptjs";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(test());
});

app.post("/users/register", async (req, res) => {
  try {
    // Get user data
    let user = req.body.user;

    // Hash password
    const salt_rounds = 10;
    const salt = await bcrypt.genSaltSync(salt_rounds);
    const hash = await bcrypt.hashSync(user.password, salt);

    // Save user in database

    // Send response successful
    res.status(201).send("The user has been registered");
  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
});

app.post("/users/login", async (req, res) => {
  try {
    // Get user login informations
    let user_login = req.body;

    // Verify user existing in the database
    let user = true;

    if (user) {
      res
        .status(200)
        .send({ message: "Successful authentication", user: user });
    } else {
      res.status(401).send({ message: "Authentication failed" });
    }
  } catch (error) {
    res.status(500).send({ message: error + "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
