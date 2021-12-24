const { Router } = require("express");
const { ROLES } = require("../config/keys");
const { uploadData } = require("../controllers/censusController");
const checkIsInPeriod = require("../middlewares/time");
const { checkIsLowerRoleThan, checkIsHigherRoleThan } = require("../middlewares/role.middleware");
const { checkHasPrivileges, authenticateToken } = require("../middlewares/privilege");

const censusRouter = Router();

censusRouter.post("/",
  authenticateToken,
  checkHasPrivileges,
  checkIsInPeriod,
  checkIsLowerRoleThan(ROLES.A3),
  uploadData
);
// censusRouter.post("/", checkIsInPeriod, checkIsHigherRoleThan(ROLES.B2), uploadData);

module.exports = censusRouter;
