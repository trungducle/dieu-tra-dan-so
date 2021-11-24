const { Router } = require("express");
const { ROLES } = require("../config/keys");
const checkIsRole = require("../middlewares/role");

const b2Router = Router();
b2Router.use(checkIsRole(ROLES.B2));

module.exports = b2Router;
