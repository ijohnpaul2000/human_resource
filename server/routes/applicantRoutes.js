const router = require("express").Router();

const {
  POSTapplicant,
  GETapplicants,
  GETapplicant,
  PUTapplicant,
  DELETEapplicant,
} = require("../controllers/applicantController");

router.post("/", POSTapplicant);
router.get("/", GETapplicants);
router.get("/:applicant_id", GETapplicant);
router.put("/:applicant_id", PUTapplicant);
router.delete("/:applicant_id", DELETEapplicant);

module.exports = router;
