const router = require("express").Router();

const {
  POSTappointment,
  GETappointments,
  GETappointmentById,
  PUTappointment,
  DELETEappointment,
} = require("../controllers/appointmentController");

router.post("/", POSTappointment);
router.get("/", GETappointments);
router.get("/:applicant_id", GETappointmentById);
router.put("/:id", PUTappointment);
router.delete("/:id", DELETEappointment);

module.exports = router;
