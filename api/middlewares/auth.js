const { verifyAccessToken } = require("../configs/auth");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ err: "Invalid token" });
  }

  try {
    const user = verifyAccessToken(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

module.exports = authenticateToken;