const { Router } = require("express");
const {
  analyseByAge,
  analyseByEducationLevel,
  analyseBySex,
  analyseByReligion,
  analyseByPopulation
 } = require("../controllers/analyseController");

const citizenRouter = Router();

citizenRouter.post("/age", analyseByAge);
citizenRouter.post("/sex", analyseBySex);
citizenRouter.post("/religion", analyseByReligion);
citizenRouter.post("/education", analyseByEducationLevel);
citizenRouter.post("/population", analyseByPopulation);

module.exports = citizenRouter;