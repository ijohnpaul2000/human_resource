const Applicants = require("../models/").Applicant;
const Employees = require("../models/").Employee;
const expressAsyncHandler = require("express-async-handler");

const GETApplicantsEmployees = expressAsyncHandler(async (req, res) => {
  const applicants = await Applicants.findAll();
  const employees = await Employees.findAll();

  if (!applicants || !employees) {
    return res.status(404).json({
      message: "No Applicants or Employees found!",
    });
  }

  res.status(200).json({
    data: {
      applicants,
      employees,
    },
    message: "Applicants and Employees fetched successfully.",
  });
});

module.exports = {
  GETApplicantsEmployees,
};
