const { verifyAccessToken } = require("../config/auth");

const checkIsRole = (role) => (req, res, next) => {
  const { roleId } = req.user;

  try {
    if (roleId !== role) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    next();
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

module.exports = checkIsRole;
