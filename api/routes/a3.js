const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  createAccount,
  togglePrivileges,
} = require("../controllers/accountController");
const checkIsRole = require("../middlewares/role");
const checkIsInPeriod = require("../middlewares/time");

const a3Router = Router();

a3Router
  .route("/accounts")
  .post(checkIsRole(ROLES.A3), createAccount)
  .put(checkIsInPeriod, checkIsRole(ROLES.A3), togglePrivileges);

module.exports = a3Router;
