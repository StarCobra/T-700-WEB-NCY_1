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
    const saltRounds = 10;
    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(user.password, salt);

    // Save user in database

    // Send response successful
    res.status(201).send("The user has been registered");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
