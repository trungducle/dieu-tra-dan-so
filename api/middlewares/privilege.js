const { db } = require("../config/database");
const { verifyAccessToken } = require("../config/auth");

module.exports = {
  checkHasPrivileges: async (req, res, next) => {
    try {
      const result = await db.one(
        "SELECT bi_khoa_quyen FROM tai_khoan WHERE id = $1",
        [req.user.accountId]
      );
      const isLocked = result.bi_khoa_quyen;
      return isLocked
        ? res.status(403).json({ error: "Bạn không được cấp quyền!" })
        : next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
  authenticateToken: (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Invalid token" });
    }

    const user = verifyAccessToken(token);
    req.user = user;
    next();
  },
};
