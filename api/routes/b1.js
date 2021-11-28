const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  createAccount,
  togglePrivileges,
} = require("../controllers/accountController");
const checkIsRole = require("../middlewares/role");
const checkIsInPeriod = require("../middlewares/time");

const b1Router = Router();

b1Router
  .route("/accounts")
  .post(checkIsRole(ROLES.B1), createAccount)
  .put(checkIsInPeriod, checkIsRole(ROLES.B1), togglePrivileges);

module.exports = b1Router;
