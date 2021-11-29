const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  createAccount,
  togglePrivileges,
} = require("../controllers/accountController");
const { createDepartment } = require("../controllers/departmentController");
const checkIsRole = require("../middlewares/role");
const checkIsInPeriod = require("../middlewares/time");

const b1Router = Router();

b1Router
  .route("/accounts")
  .post(checkIsRole(ROLES.B1), createAccount)
  .put(checkIsInPeriod, checkIsRole(ROLES.B1), togglePrivileges);

b1Router.post("/departments", checkIsRole(ROLES.B1), createDepartment); //Thêm một thôn, bản, tổ dân phố mới

module.exports = b1Router;
