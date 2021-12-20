const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  createAccount,
  togglePrivileges,
} = require("../controllers/accountController");
const { checkIsHigherRoleThan } = require("../middlewares/role.middleware");
const checkIsInPeriod = require("../middlewares/time");

const accountRouter = Router();

accountRouter
  .route("/")
  .post(checkIsHigherRoleThan(ROLES.B2), createAccount)
  .put(checkIsInPeriod, checkIsHigherRoleThan(ROLES.B2), togglePrivileges);

module.exports = accountRouter;
