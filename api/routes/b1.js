const { Router } = require("express");
const { ROLES } = require("../config/keys");
const { createAccount } = require("../controllers/accountController");
const { createDepartment } = require("../controllers/departmentController");
const checkIsRole = require("../middlewares/role");

const b1Router = Router();
b1Router.use(checkIsRole(ROLES.B1));

b1Router.post("/accounts", createAccount);

b1Router.post("/departments", createDepartment); //Thêm một thôn, bản, tổ dân phố mới

module.exports = b1Router;
