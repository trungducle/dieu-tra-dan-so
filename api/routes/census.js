const { Router } = require("express");
const { ROLES } = require("../config/keys");
const {
  uploadData,
  createNewHousehold,
  getHouseholdDetails,
  getHouseholdList,
  deleteInfo,
  confirmComplete,
  superviseProgress,
  checkCompleteStatus,
} = require("../controllers/censusController");
const checkIsInPeriod = require("../middlewares/time");
const { checkIsLowerRoleThan } = require("../middlewares/role.middleware");
const { validateCensusData } = require("../middlewares/validateInput");
const {
  checkHasPrivileges,
  authenticateToken,
  checkHasCompleted,
} = require("../middlewares/privilege");

const censusRouter = Router();

censusRouter
  .route("/progress/my-progress")
  .get(authenticateToken, checkCompleteStatus)
  .put(authenticateToken, checkHasPrivileges, checkIsInPeriod, confirmComplete);

censusRouter.get("/progress/subunits", authenticateToken, superviseProgress);

censusRouter.post(
  "/:villageId",
  authenticateToken,
  checkHasPrivileges,
  checkIsInPeriod,
  checkHasCompleted,
  checkIsLowerRoleThan(ROLES.A3),
  validateCensusData,
  uploadData
);

censusRouter
  .route("/:villageId/households")
  .get(
    authenticateToken,
    checkIsInPeriod,
    checkIsLowerRoleThan(ROLES.A3),
    getHouseholdList
  )
  .post(
    authenticateToken,
    checkHasPrivileges,
    checkIsInPeriod,
    checkHasCompleted,
    checkIsLowerRoleThan(ROLES.A3),
    createNewHousehold
  );

censusRouter.get(
  "/:villageId/households/:householdId",
  authenticateToken,
  checkIsInPeriod,
  checkIsLowerRoleThan(ROLES.A3),
  getHouseholdDetails
);

censusRouter.delete(
  "/:villageId/households/info/:infoId",
  authenticateToken,
  checkHasPrivileges,
  checkIsInPeriod,
  checkHasCompleted,
  checkIsLowerRoleThan(ROLES.A3),
  deleteInfo
);

module.exports = censusRouter;
