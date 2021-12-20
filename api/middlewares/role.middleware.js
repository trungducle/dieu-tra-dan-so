const { verifyAccessToken } = require("../config/auth");

module.exports = {
  checkIsHigherRoleThan: (role) => async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Invalid token" });
    }

    try {
      const user = verifyAccessToken(token);
      if (user.role >= role) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      req.user = user;
      next();
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },
  checkIsLowerRoleThan: (role) => async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Invalid token" });
    }

    try {
      const user = verifyAccessToken(token);
      if (user.role <= role) {
        return res.status(403).json({ error: "Unauthorized" });
      }
      req.user = user;
      next();
    } catch (err) {
      res.status(403).json({ error: err.message });
    }
  },
};
