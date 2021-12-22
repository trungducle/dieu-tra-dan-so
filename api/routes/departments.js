const { Router } = require("express");
const { ROLES } = require("../config/keys");
const { createDepartment, getDirectInferiorList, getInferiorAmount } = require("../controllers/departmentController");
const checkIsInPeriod = require("../middlewares/time");
const { checkIsHigherRoleThan } = require("../middlewares/role.middleware");
const { authenticateToken } = require("../middlewares/privilege");

const departmentRouter = Router();

departmentRouter.post(
  "/",
  checkIsInPeriod,
  checkIsHigherRoleThan(ROLES.B2),
  createDepartment
); // Thêm một đơn vị hành chính cấp dưới mới

departmentRouter.get("/", authenticateToken, getDirectInferiorList);
departmentRouter.get("/amount", authenticateToken, getInferiorAmount);
departmentRouter.get("/info", authenticateToken)

module.exports = departmentRouter;
