const { Router } = require("express");
const { handleLogin } = require("../controllers/authController");

const authRouter = Router();
authRouter.post("/login", handleLogin);

module.exports = authRouter;