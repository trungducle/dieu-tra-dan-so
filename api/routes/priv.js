const { Router } = require("express");
const { checkOwnPrivileges } = require("../controllers/accountController");
const { checkIsLowerRoleThan } = require("../middlewares/role.middleware");
const checkIsInPeriod = require("../middlewares/time");
const { authenticateToken } = require("../middlewares/privilege");

const privRouter = Router();

privRouter.get(
  "/",
  authenticateToken,
  checkIsInPeriod,
  checkIsLowerRoleThan(-1), // mọi tài khoản đều được phép kiểm tra quyền khai báo của mình
  checkOwnPrivileges
);

module.exports = privRouter;
