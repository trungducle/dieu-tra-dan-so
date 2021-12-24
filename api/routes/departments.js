const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  createDepartment,
  getVillageList,
} = require("../controllers/departmentController");
const checkIsInPeriod = require("../middlewares/time");
const { checkIsHigherRoleThan } = require("../middlewares/role.middleware");
const { checkHasPrivileges } = require("../middlewares/privilege");

const departmentRouter = Router();

departmentRouter.post(
  "/",
  checkIsInPeriod,
  checkIsHigherRoleThan(ROLES.B2),
  checkHasPrivileges,
  createDepartment
); // Thêm một đơn vị hành chính cấp dưới mới

departmentRouter.get(
  "/villages",
  checkIsInPeriod,
  checkIsHigherRoleThan(ROLES.B2),
  checkHasPrivileges,
  getVillageList
);

module.exports = departmentRouter;
