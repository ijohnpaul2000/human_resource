const router = require("express").Router();

const {
  POSTemployee,
  GETemployees,
  GETemployee,
  PUTemployee,
  DELETEemployee,
} = require("../controllers/employeeController");

router.post("/", POSTemployee);
router.get("/", GETemployees);
router.get("/:employee_id", GETemployee);
router.put("/:employee_id", PUTemployee);
router.delete("/:employee_id", DELETEemployee);

module.exports = router;
