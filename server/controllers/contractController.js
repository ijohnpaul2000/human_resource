const Contract = require("../models").Contract;
const Appointment = require("../models").Appointment;
const Applicant = require("../models").Applicant;
const Employee = require("../models").Employee;
const User = require("../models").User;

const expressAsyncHandler = require("express-async-handler");
const moment = require("moment");
const path = require("path");
const { v4 } = require("uuid");
const { generateFilename } = require("../utils/generateFilename");

// @route POST /api/contract
// @desc Create a new contract
// @access Public
const POSTcontract = expressAsyncHandler(async (req, res) => {
  const { applicant_id, salary, contract_date } = req.body;
  const files = req.file;

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
          "birthplace",
          "sex",
          "religion",
          "citizenship",
          "educational_background",
          "civil_status",
        ],
      },
    ],
  });

  const activeContract = await Contract.findOne({
    where: { employee_id: applicant_id, contract_status: "active" },
  });

  //* Will convert the user_level from applicant to employee
  const userInfo = await User.findOne({
    where: { id: applicant_id },
  });

  if (!appointmentInfo) {
    return res.status(404).json({
      message: "Applicant not found",
    });
  }

  if (activeContract) {
    return res.status(200).json({
      message: "This applicant have an active contract.",
    });
  }
  console.log(req.body, req.file);

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
    const employee = {
      ...appointmentInfo.dataValues.Applicant.dataValues,
      employee_status: "active",
      isEmployeeDeployed: true,
      date_hired: moment().format("YYYY-MM-DD"),
    };

    const updatedUser = {
      ...userInfo,
      user_level: "employee",
    };

    const newContract = {
      id: v4(),
      employee_id: applicant_id,
      ...req.body,
      contract_status: "Active",
      contract_image: files.originalname,
    };
    await Employee.create(employee);

    await Contract.create(newContract);

    await User.update(updatedUser, { where: { id: applicant_id } });

    await Applicant.destroy({ where: { id: applicant_id } });
    await Appointment.destroy({ where: { applicant_id } });

    res.status(200).json({
      data: {
        message: "Contract created successfully",
      },
      status: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      data: {
        message: "Something went wrong",
      },
      status: "failed",
    });
  }
});

const GETContracts = expressAsyncHandler(async (req, res) => {
  const contracts = await Contract.findAll({
    include: [
      {
        model: Employee,
        as: "Employee",
        attributes: [
          "firstname",
          "middlename",
          "lastname",
          "isEmployeeDeployed",
        ],
      },
    ],
  });

  if (!contracts) {
    return res.status(404).json({
      message: "Contracts not found",
    });
  }

  res.status(200).json({
    contracts,
    status: "success",
  });
});

const PUTContracts = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { contract_status, employee_status } = req.body;

  try {
    const contract = await Contract.findOne({
      where: { id },
    });

    const employee = await Employee.findOne({
      where: { id: contract.employee_id },
    });

    if (!contract) {
      return res.status(404).json({
        message: "Contract not found",
      });
    }

    const updatedContract = {
      ...contract,
      contract_status,
    };

    const updatedEmployee = {
      ...employee,
      employee_status,
    };
    await Contract.update(updatedContract, { where: { id } });

    await Employee.update(updatedEmployee, {
      where: { id: contract.employee_id },
    });

    res.status(200).json({
      status: "success",
    });
  } catch (error) {
    console.log(error);
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
  GETContracts,
  PUTContracts,
};
