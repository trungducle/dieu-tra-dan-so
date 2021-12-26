const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  createAccount,
  togglePrivileges,
} = require("../controllers/accountController");
const { checkIsHigherRoleThan } = require("../middlewares/role.middleware");
const checkIsInPeriod = require("../middlewares/time");
const { checkHasPrivileges, authenticateToken } = require("../middlewares/privilege");

const accountRouter = Router();

accountRouter
  .route("/")
  .put(
    authenticateToken,
    checkHasPrivileges,
    checkIsInPeriod,
    checkIsHigherRoleThan(ROLES.B2),
    togglePrivileges
  );

module.exports = accountRouter;
