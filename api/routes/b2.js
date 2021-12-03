const { Router } = require("express");
const { ROLES } = require("../config/keys");
const { uploadData } = require("../controllers/censusController");
const checkIsRole = require("../middlewares/role");
const checkIsInPeriod = require("../middlewares/time");

const b2Router = Router();
b2Router.use(checkIsInPeriod);
b2Router.use(checkIsRole(ROLES.B2));

b2Router.post("/census", uploadData);

module.exports = b2Router;
