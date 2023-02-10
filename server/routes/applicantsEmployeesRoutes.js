const router = require("express").Router();

const {
  GETApplicantsEmployees,
} = require("../controllers/applicantsEmployeesController");

router.get("/", GETApplicantsEmployees);

module.exports = router;
