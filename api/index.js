import { test } from "./test.js";
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send(test());
});

app.post("/users/register", (req, res) => {
  try {
    let body = req.body.test;
    console.log(body);
    res.send("Data Received :" + JSON.stringify(body));
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
