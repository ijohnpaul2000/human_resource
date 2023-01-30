const Appointment = require("../models").Appointment;
const Applicant = require("../models").Applicant;
const expressAsyncHandler = require("express-async-handler");
const { v4 } = require("uuid");
const validateField = require("../utils/validateField");

// @route POST /api/appointments
// @desc Create a new appointment
// @access Public
const POSTappointment = expressAsyncHandler(async (req, res) => {
  const {
    applicant_id,
    appointment_date,
    appointment_time,
    appointment_location,
    appointment_description,
    appointment_type,
  } = req.body;

  //* Check if applicant already has an appointment
  const existingAppointment = await Appointment.findOne({
    where: { applicant_id },
  });

  const existingApplicant = await Applicant.findOne({
    where: { id: applicant_id },
  });

  if (existingAppointment) {
    return res.status(400).json({
      message:
        "This applicant has existing appointment. Either Update or Delete the appointment record.",
    });
  }

  if (!existingApplicant) {
    return res.status(400).json({ message: "Applicant does not exist" });
  }

  try {
    const newAppointment = {
      id: v4(),
      applicant_id,
      appointment_date,
      appointment_time,
      appointment_location,
      appointment_description,
      appointment_type,
    };

    const createdAppointment = await Appointment.create(newAppointment);
    res.status(200).json(createdAppointment);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

// @route GET /api/appointments
// @desc Get all appointments
// @access Public
const GETappointments = expressAsyncHandler(async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      include: [
        {
          model: Applicant,
          as: "Applicant",
          attributes: ["id", "firstname", "middlename", "lastname"],
        },
      ],
    });
    res.status(200).json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

// @route GET /api/appointments/:id
// @desc Get an appointment by id
// @access Public
const GETappointmentById = expressAsyncHandler(async (req, res) => {
  const { applicant_id } = req.params;

  try {
    const applicant = await Applicant.findByPk(applicant_id);
    const appointment = await Appointment.findOne({
      where: { applicant_id },
    });

    if (!applicant) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json({
      applicant,
      appointment,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

// @route PUT /api/appointments/:id
// @desc Update an appointment by id
// @access Public
const PUTappointment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingAppointment = await Appointment.findOne({
    where: { id },
  });

  if (!existingAppointment) {
    return res.status(400).json({ message: "Appointment does not exist" });
  }

  try {
    const updatedAppointment = {};

    Object.entries(req.body).map(([key, value]) => {
      updatedAppointment[key] = validateField(value);
    });

    await Appointment.update(updatedAppointment, {
      where: { id },
    });

    res.status(200).json({ message: "Appointment updated successfully!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route DELETE /api/appointments/:id
// @desc Delete an appointment by id
// @access Public
const DELETEappointment = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const existingAppointment = await Appointment.findOne({
    where: { id },
  });

  if (!existingAppointment) {
    return res.status(400).json({ message: "Appointment does not exist" });
  }

  try {
    await Appointment.destroy({ where: { id } });
    res.status(200).json({ message: "Appointment deleted successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = {
  POSTappointment,
  GETappointments,
  GETappointmentById,
  PUTappointment,
  DELETEappointment,
};
