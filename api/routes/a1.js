const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  createAccount,
  togglePrivileges,
} = require("../controllers/accountController");
const checkIsRole = require("../middlewares/role");
const checkIsInPeriod = require("../middlewares/time");

const a1Router = Router();

a1Router
  .route("/accounts")
  .post(checkIsRole(ROLES.A1), createAccount)
  .put(checkIsInPeriod, checkIsRole(ROLES.A1), togglePrivileges);

module.exports = a1Router;
