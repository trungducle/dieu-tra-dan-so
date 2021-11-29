const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  createAccount,
  togglePrivileges,
} = require("../controllers/accountController");
const { createDepartment } = require("../controllers/departmentController");
const checkIsRole = require("../middlewares/role");

const a3Router = Router();
a3Router.use(checkIsRole(ROLES.A3));

a3Router
  .route("/accounts")
  .post(createAccount)
  .put(togglePrivileges);

a3Router.post("/departments", createDepartment); //Thêm một xã, phường mới

module.exports = a3Router;
