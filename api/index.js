const express = require('express');
const { createServer } = require('http');
const { db } = require('./configs/database');
const { PORT } = require('./configs/keys');

const app = express();
const server = createServer(app);

app.get('/', async (req, res) => {
  const result = await db.any('SELECT * FROM tinh_thanh');
  res.json(result);
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});