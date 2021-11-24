const { Router } = require("express");
const { ROLES } = require("../config/keys");
const { createAccount } = require("../controllers/accountController");
const checkIsRole = require("../middlewares/role");

const b1Router = Router();
b1Router.use(checkIsRole(ROLES.B1));

b1Router.post("/", createAccount);

module.exports = b1Router;
