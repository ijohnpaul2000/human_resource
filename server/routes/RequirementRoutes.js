const router = require("express").Router();
const {
  POSTRequirement,
  GETRequirements,
  GETRequirementById,
  PUTRequirementById,
  DELETERequirementById,
} = require("../controllers/requirementController");

router.post("/", POSTRequirement);
router.get("/", GETRequirements);
router.get("/:applicant_id", GETRequirementById);
router.put("/:applicant_id", PUTRequirementById);
router.delete("/:applicant_id", DELETERequirementById);

module.exports = router;
