const { Router } = require("express");
const { ROLES } = require("../config/keys");
const checkIsRole = require("../middlewares/role");
const checkIsInPeriod = require("../middlewares/time");

const b2Router = Router();
b2Router.use(checkIsInPeriod);
b2Router.use(checkIsRole(ROLES.B2));

module.exports = b2Router;
