const jwt = require('jsonwebtoken');
const { ACCESS_SECRET } = require('./keys');

exports.getAccessToken = (user) => jwt.sign(
  user,
  ACCESS_SECRET
);

exports.verifyAccessToken = (token) => jwt.verify(
  token,
  ACCESS_SECRET
);