const { Router } = require("express");
// const { ROLES } = require("../config/keys");
const { getCitizenAmount, queryCitizenAmount, getCitizenList } = require("../controllers/citizenController");
const { authenticateToken } = require("../middlewares/privilege");

const citizenRouter = Router();

citizenRouter.get("/amount", authenticateToken, queryCitizenAmount);
citizenRouter.get("/amount/local", authenticateToken, getCitizenAmount);
citizenRouter.get("/list", authenticateToken, getCitizenList);

module.exports = citizenRouter;