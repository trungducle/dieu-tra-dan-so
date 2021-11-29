const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  createAccount,
  togglePrivileges,
} = require("../controllers/accountController");
const { createDepartment } = require("../controllers/departmentController");
const checkIsRole = require("../middlewares/role");
const checkIsInPeriod = require("../middlewares/time");

const a2Router = Router();

a2Router
  .route("/accounts")
  .post(checkIsRole(ROLES.A2), createAccount)
  .put(checkIsInPeriod, checkIsRole(ROLES.A2), togglePrivileges);

a2Router.post("/departments", checkIsRole(ROLES.A2), createDepartment); // Thêm một quận, huyện mới

module.exports = a2Router;