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
const { checkHasPrivileges, authenticateToken, checkHasCompleted } = require("../middlewares/privilege");

const departmentRouter = Router();

departmentRouter
  .route("/")
  .get(authenticateToken, getInferiorList)
  .post(
    authenticateToken,
    checkHasPrivileges,
    checkIsInPeriod,
    checkHasCompleted,
    checkIsHigherRoleThan(ROLES.B2),
    createDepartment
  ); // Thêm một đơn vị hành chính cấp dưới mới

departmentRouter.get(
  "/villages",
  authenticateToken,
  checkHasPrivileges,
  checkIsInPeriod,
  checkIsHigherRoleThan(ROLES.B2),
  getVillageList
);

departmentRouter.get("/amount", authenticateToken, getInferiorAmount);

module.exports = departmentRouter;
