import express from 'express';
import { createDatabase } from './database/create.js';
import {test} from "./test.js";

const app = express();
const port = 3005;

createDatabase().then(r => {
  console.log("bdd");
});

app.get('/', (req, res) => {
  res.send(test());
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
