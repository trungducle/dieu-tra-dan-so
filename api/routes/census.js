const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  uploadData,
  createNewHousehold,
  getHouseholdDetails,
  getHouseholdList,
  deleteInfo,
} = require("../controllers/censusController");
const checkIsInPeriod = require("../middlewares/time");
const { checkIsLowerRoleThan } = require("../middlewares/role.middleware");
const { validateCensusData } = require("../middlewares/validateInput");
const { checkHasPrivileges } = require("../middlewares/privilege");

const censusRouter = Router();

censusRouter.post(
  "/:villageId",
  checkIsInPeriod,
  checkIsLowerRoleThan(ROLES.A3),
  checkHasPrivileges,
  validateCensusData,
  uploadData
);

censusRouter
  .route("/:villageId/households")
  .get(checkIsInPeriod, checkIsLowerRoleThan(ROLES.A3), getHouseholdList)
  .post(
    checkIsInPeriod,
    checkIsLowerRoleThan(ROLES.A3),
    checkHasPrivileges,
    createNewHousehold
  );

censusRouter.get(
  "/:villageId/households/:householdId",
  checkIsInPeriod,
  checkIsLowerRoleThan(ROLES.A3),
  getHouseholdDetails
);

censusRouter.delete(
  "/:villageId/households/info/:infoId",
  checkIsInPeriod,
  checkIsLowerRoleThan(ROLES.A3),
  checkHasPrivileges,
  deleteInfo
);
// const { checkIsLowerRoleThan, checkIsHigherRoleThan } = require("../middlewares/role.middleware");
// const { checkHasPrivileges, authenticateToken } = require("../middlewares/privilege");

// const censusRouter = Router();

// censusRouter.post("/",
//   authenticateToken,
//   checkHasPrivileges,
//   checkIsInPeriod,
//   checkIsLowerRoleThan(ROLES.A3),
//   uploadData
// );
// // censusRouter.post("/", checkIsInPeriod, checkIsHigherRoleThan(ROLES.B2), uploadData);

module.exports = censusRouter;
