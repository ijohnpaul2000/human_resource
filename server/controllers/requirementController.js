const Requirement = require("../models").Requirement;
const Applicant = require("../models").Applicant;
const expressAsyncHandler = require("express-async-handler");
const { v4 } = require("uuid");
const validateField = require("../utils/validateField");

//@route POST api/requirements
//@desc Create a new requirement
//@access Public
const POSTRequirement = expressAsyncHandler(async (req, res) => {
  const {
    applicant_id,
    pic2x2,
    licenseCard,
    neuroExam,
    trainingCertificate,
    openingClosingRep,
    transcriptRecord,
    firingCertificate,
    drugTestResult,
    brgyClearance,
    policeClearance,
    nbiClearance,
    dilgClearance,
    hsCollegeCertificate,
    gkeResult,
    nsoCerfiticate,
    otherGovId,
    completionStatus,
  } = req.body;

  const existingRequirement = await Requirement.findOne({
    where: { applicant_id },
  });

  if (existingRequirement) {
    return res.status(400).json({
      message:
        "This applicant has existing requirement. Either Update or Delete the requirements record first before creating a new one.",
    });
  }

  try {
    const requirement = await Requirement.create({
      id: v4(),
      applicant_id,
      pic2x2,
      licenseCard,
      neuroExam,
      trainingCertificate,
      openingClosingRep,
      transcriptRecord,
      firingCertificate,
      drugTestResult,
      brgyClearance,
      policeClearance,
      nbiClearance,
      dilgClearance,
      hsCollegeCertificate,
      gkeResult,
      nsoCerfiticate,
      otherGovId,
      completionStatus,
    });
    res.status(201).json(requirement);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

//@route GET api/requirements
//@desc Get all requirements
//@access Public
const GETRequirements = expressAsyncHandler(async (req, res) => {
  try {
    const requirements = await Requirement.findAll({
      include: [
        {
          model: Applicant,
          as: "Applicant",
          attributes: ["id", "firstname", "middlename", "lastName"],
        },
      ],
    });
    res.status(200).json(requirements);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

//@route GET api/requirements/applicant_id
//@desc Get requirement by applicant_id
//@access Public

const GETRequirementById = expressAsyncHandler(async (req, res) => {
  const { applicant_id } = req.params;

  try {
    const applicant = await Applicant.findByPk(applicant_id);
    const requirement = await Requirement.findOne({
      where: { applicant_id },
    });

    if (!requirement) {
      return res.status(404).json({
        message: "Requirement list with this Applicant not found.",
      });
    }

    res.status(200).json({
      applicant,
      requirement,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

//@route PUT api/requirements/applicant_id
//@desc Update requirement by applicant_id
//@access Public
const PUTRequirementById = expressAsyncHandler(async (req, res) => {
  const { applicant_id } = req.params;

  const requirement = await Requirement.findOne({
    where: { applicant_id },
  });

  if (!requirement) {
    return res.status(404).json({
      message: "Requirement list with this Applicant not found.",
    });
  }
  try {
    const updatedRequirement = {};

    Object.entries(req.body).map(([key, value]) => {
      updatedRequirement[key] = validateField(value);
    });

    await Requirement.update(updatedRequirement, {
      where: { applicant_id },
    });

    res.status(200).json({ message: "Requirements updated successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

//@route DELETE api/requirements/applicant_id
//@desc Delete requirement by applicant_id
//@access Public
const DELETERequirementById = expressAsyncHandler(async (req, res) => {
  const { applicant_id } = req.params;

  const requirement = await Requirement.findOne({
    where: { applicant_id },
  });

  if (!requirement) {
    return res.status(404).json({
      message: "Requirement list with this Applicant not found.",
    });
  }

  try {
    await Requirement.destroy({ where: { applicant_id } });
    res.status(200).json({ message: "Requirement deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

module.exports = {
  POSTRequirement,
  GETRequirements,
  GETRequirementById,
  PUTRequirementById,
  DELETERequirementById,
};
