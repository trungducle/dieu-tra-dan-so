const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  createAccount,
  togglePrivileges,
} = require("../controllers/accountController");
const { createDepartment } = require("../controllers/departmentController");
const checkIsRole = require("../middlewares/role");

const a1Router = Router();
a1Router.use(checkIsRole(ROLES.A1));

a1Router
  .route("/accounts")
  .post(createAccount)
  .put(togglePrivileges);

a1Router.post("/departments", createDepartment); //Thêm một tỉnh, thành phố mới

module.exports = a1Router;
