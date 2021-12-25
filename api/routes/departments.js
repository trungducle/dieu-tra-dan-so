const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  createDepartment,
  getVillageList,
  getInferiorAmount,
  getInferiorList,
} = require("../controllers/departmentController");
const checkIsInPeriod = require("../middlewares/time");
const { checkIsHigherRoleThan } = require("../middlewares/role.middleware");
const { checkHasPrivileges, authenticateToken } = require("../middlewares/privilege");

const departmentRouter = Router();

departmentRouter.post(
  "/",
  checkIsHigherRoleThan(ROLES.B2),
  checkHasPrivileges,
  createDepartment
); // Thêm một đơn vị hành chính cấp dưới mới

departmentRouter.get(
  "/villages",
  authenticateToken,
  checkIsInPeriod,
  checkIsHigherRoleThan(ROLES.B2),
  checkHasPrivileges,
  getVillageList
);
departmentRouter.get("/", authenticateToken, getInferiorList);
departmentRouter.get("/amount", authenticateToken, getInferiorAmount);

module.exports = departmentRouter;
