const { Router } = require("express");
const { checkOwnPrivileges } = require("../controllers/accountController");
const checkIsInPeriod = require("../middlewares/time");
const { authenticateToken } = require("../middlewares/privilege");

const privRouter = Router();

privRouter.get("/", authenticateToken, checkIsInPeriod, checkOwnPrivileges);

module.exports = privRouter;
