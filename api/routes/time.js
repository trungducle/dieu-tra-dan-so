const { Router } = require("express");

const { authenticateToken } = require("../middlewares/privilege");
const checkEndTime = require("../controllers/timeController");

const timeRouter = Router();

timeRouter.get("/end", authenticateToken, checkEndTime);

module.exports = timeRouter;
