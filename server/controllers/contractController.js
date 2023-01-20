const Contract = require("../models").Contract;
const Appointment = require("../models").Appointment;
const Applicant = require("../models").Applicant;
const Employee = require("../models").Employee;

const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");
const path = require("path");
const { v4 } = require("uuid");
const { generateFilename } = require("../utils/generateFileName");

// @route POST /api/contract
// @desc Create a new contract
// @access Public
const POSTcontract = expressAsyncHandler(async (req, res) => {
  const { applicant_id, salary, contract_date, contract_image } = req.body;
  const files = req.files;

  const appointmentInfo = await Appointment.findOne({
    where: { applicant_id },
    include: [
      {
        model: Applicant,
        as: "Applicant",
        attributes: [
          "id",
          "firstname",
          "middlename",
          "lastname",
          "suffix",
          "age",
          "contact",
          "email",
          "address",
          "city",
          "birthdate",
          "sex",
          "religion",
          "citizenship",
          "educational_background",
          "civil_status",
        ],
      },
    ],
  });

  console.log(appointmentInfo);

  // const activeContract = await Contract.findOne({
  //   where: { applicant_id },
  // });

  // if (!appointmentInfo) {
  //   res.status(404).json({
  //     message: "Applicant not found",
  //   });
  // }

  // if (activeContract) {
  //   res.status(200).json({
  //     message: "This applicant have an active contract.",
  //   });
  // }

  // Object.keys(files).forEach((file) => {
  //   const filepath = path.join(
  //     __dirname,
  //     `../files/${file}`,
  //     generateFilename(files[file].name)
  //   );

  //   files[file].mv(filepath, (err) => {
  //     if (err) return res.status(500).json({ status: "error", message: err });
  //   });
  // });

  try {
    // Contract.create({
    //   id: v4(),
    //   applicant_id,
    //   salary,
    //   contract_date,
    //   contract_image: files.contract_image.name,
    // });

    // Applicant.destroy({ where: { id: applicant_id } });
    // Appointment.destroy({ where: { applicant_id } });
    // Employee.create({});

    res.status(200).json({
      data: {
        message: "Contract created successfully",
      },
      status: "success",
    });
  } catch (error) {
    res.status(500).json({
      data: {
        message: "Something went wrong",
      },
      status: "failed",
    });
  }
});

module.exports = {
  POSTcontract,
};
