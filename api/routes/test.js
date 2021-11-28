const { Router } = require("express");
const { ROLES } = require("../config/keys");
const checkIsRole = require("../middlewares/role");
const checkIsInPeriod = require("../middlewares/time");
const { db } = require("../config/database");

const testRouter = Router();

// kiểm tra middleware checkIsInPeriod
testRouter.get(
  "/",
  checkIsInPeriod,
  checkIsRole(ROLES.A1),
  async (req, res) => {
    try {
      const result = await db.any(
        "SELECT loai_tai_khoan FROM tai_khoan WHERE id = $1",
        [req.user.id]
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = testRouter;
