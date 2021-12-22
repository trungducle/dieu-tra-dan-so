const { Router } = require("express");
const { ROLES } = require("../config/keys");
const { createDepartment } = require("../controllers/departmentController");
const { checkIsInPeriod } = require("../middlewares/time");
const { checkIsHigherRoleThan } = require("../middlewares/role.middleware");

const departmentRouter = Router();

departmentRouter.post(
  "/",
  checkIsInPeriod,
  checkIsHigherRoleThan(ROLES.B2),
  createDepartment
); // Thêm một đơn vị hành chính cấp dưới mới

module.exports = departmentRouter;
