const { sign, verify } = require("jsonwebtoken");
const { ACCESS_SECRET } = require("./keys");

const getAccessToken = (user) => {
  return sign(user, ACCESS_SECRET);
};

const verifyAccessToken = (token) => {
  return verify(token, ACCESS_SECRET);
};

module.exports = { getAccessToken, verifyAccessToken };
