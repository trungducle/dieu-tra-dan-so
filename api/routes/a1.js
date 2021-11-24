const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  createAccount,
  togglePrivileges,
} = require("../controllers/accountController");
const checkIsRole = require("../middlewares/role");

const a1Router = Router();
a1Router.use(checkIsRole(ROLES.A1));

a1Router
  .route("/accounts")
  .post(createAccount)
  .put(togglePrivileges);

module.exports = a1Router;
