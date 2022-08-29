const Applicant = require("../models").Applicant;

const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");
const { v4 } = require("uuid");
const validateField = require("../utils/validateField");

// @route POST /api/applicants
// @desc Create a new applicant
// @access Public
const POSTapplicant = expressAsyncHandler(async (req, res) => {
  const {
    firstname,
    middlename,
    lastname,
    suffix,
    age,
    contact,
    email,
    address,
    city,
    birthdate,
    birthplace,
    sex,
    citizenship,
    educational_background,
    civil_status,
    applicant_status,
    application_status,
    application_notes,
    isRequirementComplete,
    religion,
  } = req.body;

  const existingApplicant = await Applicant.findOne({ where: { email } });

  if (existingApplicant) {
    return res.status(400).json({ message: "Applicant already exists" });
  }

  const formattedDate = moment(birthdate).format("YYYY-MM-DD");

  try {
    const newApplicant = {
      id: v4(),
      firstname,
      middlename,
      lastname,
      suffix,
      age,
      contact,
      email,
      address,
      city,
      birthdate: formattedDate,
      birthplace,
      sex,
      citizenship,
      educational_background,
      civil_status,
      applicant_status,
      application_status,
      application_notes,
      isRequirementComplete,
      religion,
    };

    await Applicant.create(newApplicant);
    res.status(200).json(newApplicant);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

// @route GET /api/applicants
// @desc Get all applicants
// @access Public
const GETapplicants = expressAsyncHandler(async (req, res) => {
  try {
    const applicants = await Applicant.findAll();
    res.status(200).json(applicants);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

// @route GET /api/applicants/:applicant_id
// @desc Get applicant by id
// @access Public
const GETapplicant = expressAsyncHandler(async (req, res) => {
  const { applicant_id } = req.params;

  try {
    const applicant = await Applicant.findOne({ where: { id: applicant_id } });
    res.status(200).json(applicant);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

// @route PUT /api/applicants/:applicant_id
// @desc Update applicant by id
// @access Public
const PUTapplicant = expressAsyncHandler(async (req, res) => {
  const { applicant_id } = req.params;

  const existingApplicant = await Applicant.findOne({
    where: { id: applicant_id },
  });

  if (!existingApplicant) {
    return res.status(400).json({ message: "Applicant does not exist" });
  }

  try {
    const updatedApplicant = {};

    // Loop through req.body without checking the content of the object
    Object.entries(req.body).map(([key, value]) => {
      updatedApplicant[key] = validateField(value);
    });

    await Applicant.update(updatedApplicant, { where: { id: applicant_id } });
    res.status(200).json({ message: "Applicant updated successfully!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

// @route DELETE /api/applicants/:applicant_id
// @desc Delete applicant by id
// @access Public
const DELETEapplicant = expressAsyncHandler(async (req, res) => {
  const { applicant_id } = req.params;

  const existingApplicant = await Applicant.findOne({
    where: { id: applicant_id },
  });

  if (!existingApplicant) {
    return res.status(400).json({ message: "Applicant does not exist" });
  }

  try {
    await Applicant.destroy({ where: { id: applicant_id } });
    res.status(200).json({ message: "Applicant deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});
module.exports = {
  POSTapplicant,
  GETapplicants,
  GETapplicant,
  PUTapplicant,
  DELETEapplicant,
};
