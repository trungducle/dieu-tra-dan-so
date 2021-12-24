const { Router } = require("express");
// const { ROLES } = require("../config/keys");
const { getCitizenAmount, queryCitizenAmount } = require("../controllers/citizenController");
const { authenticateToken } = require("../middlewares/privilege");

const citizenRouter = Router();

citizenRouter.get("/amount", authenticateToken, queryCitizenAmount);
citizenRouter.get("/amount/local", authenticateToken, getCitizenAmount);

module.exports = citizenRouter;