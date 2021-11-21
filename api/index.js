const express = require('express');
const { createServer } = require('http');
const { PORT } = require('./configs/keys');

const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
  res.send('btl web');
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});