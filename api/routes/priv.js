const { Router } = require("express");
const { checkOwnPrivileges } = require("../controllers/accountController");
const { authenticateToken } = require("../middlewares/privilege");
const checkIsInPeriod = require("../middlewares/time");

const privRouter = Router();

privRouter.get("/", authenticateToken, checkIsInPeriod, checkOwnPrivileges);

module.exports = privRouter;
