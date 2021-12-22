const { db } = require("../config/database");
const { verifyAccessToken } = require("../config/auth");

exports.checkHasPrivileges = async (req, res, next) => {
  try {
    const result = await db.one(
      "SELECT bi_khoa_quyen FROM tai_khoan WHERE id = $1",
      [req.user.id]
    );
    const isLocked = result.bi_khoa_quyen;
    if (isLocked) {
      return res.status(403).json({ error: "Bạn không được cấp quyền!" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Invalid token" });
  }

  try {
    const user = verifyAccessToken(token);
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};
