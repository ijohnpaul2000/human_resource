const Employee = require("../models/").Employee;
const { v4 } = require("uuid");
const moment = require("moment");
const validateField = require("../utils/validateField");
const expressAsyncHandler = require("express-async-handler");

// @route POST /api/employees
// @desc Create a new employee
// @access Public
const POSTemployee = expressAsyncHandler(async (req, res) => {
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
    religion,
    employee_status,
    isEmployeeDeployed,
    date_hired,
  } = req.body;

  const existingEmployee = await Employee.findOne({ where: { email } });

  if (existingEmployee) {
    return res.status(400).json({ message: "Employee already exists" });
  }
  const formattedDate = moment(birthdate).format("YYYY-MM-DD");

  try {
    const newEmployee = {
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
      religion,
      employee_status,
      isEmployeeDeployed,
      date_hired,
    };

    await Employee.create(newEmployee);
    res.status(200).json({ message: "Employee created successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

// @route GET /api/employees
// @desc Get all employees
// @access Public
const GETemployees = expressAsyncHandler(async (req, res) => {
  try {
    const employees = await Employee.findAll();
    res.status(200).json(employees);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

// @route GET /api/employees/:employee_id
// @desc Get an employee by employee_id
// @access Public
const GETemployee = expressAsyncHandler(async (req, res) => {
  const { employee_id } = req.params;

  try {
    const employee = await Employee.findOne({ where: { id: employee_id } });
    res.status(200).json(employee);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

// @route PUT /api/employees/:employee_id
// @desc Update an employee by employee_id
// @access Public
const PUTemployee = expressAsyncHandler(async (req, res) => {
  const { employee_id } = req.params;

  const existingEmployee = await Employee.findOne({
    where: { id: employee_id },
  });

  if (!existingEmployee) {
    return res.status(400).json({ message: "Employee does not exist" });
  }

  try {
    const updatedEmployee = {};

    Object.entries(req.body).map(([key, value]) => {
      updatedEmployee[key] = validateField(value);
    });

    await Employee.update(updatedEmployee, { where: { id: employee_id } });
    res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

// @route DELETE /api/employees/:employee_id
// @desc Delete an employee by employee_id
// @access Public
const DELETEemployee = expressAsyncHandler(async (req, res) => {
  const { employee_id } = req.params;

  const existingEmployee = await Employee.findOne({
    where: { id: employee_id },
  });

  if (!existingEmployee) {
    return res.status(400).json({ message: "Employee does not exist" });
  }

  try {
    await Employee.destroy({ where: { id: employee_id } });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong! Please try again later." });
  }
});

module.exports = {
  POSTemployee,
  GETemployees,
  GETemployee,
  PUTemployee,
  DELETEemployee,
};
