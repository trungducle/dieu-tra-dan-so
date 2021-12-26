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
  checkHasCompleted: async (req, res, next) => {
    try {
      const result = await db.one(
        "SELECT hoan_thanh FROM dieu_tra_dan_so WHERE tai_khoan = $1",
        [req.user.username]
      );

      return result.hoan_thanh
        ? res.status(401).json({ error: "Bạn đã hoàn thành tiến độ điều tra!" })
        : next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
