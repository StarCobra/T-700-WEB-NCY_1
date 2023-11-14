import { test } from "./test.js";
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send(test());
});

app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});
