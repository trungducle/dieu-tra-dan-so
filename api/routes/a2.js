const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  createAccount,
  togglePrivileges,
} = require("../controllers/accountController");
const checkIsRole = require("../middlewares/role");

const a2Router = Router();
a2Router.use(checkIsRole(ROLES.A2));

a2Router
  .route("/accounts")
  .post(createAccount)
  .put(togglePrivileges);

module.exports = a2Router;
