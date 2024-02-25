const Employees = require("../models/employeeModel");

exports.getEmployees = (req, res, next) => {
  Employees.find().then((result) => {
    res.status(200).json(result);
  });
};

exports.getStatus = (req, res, next) => {
  const { id } = req.params;
  Employees.find({ userId: id }).then((result) => {
    res.status(200).json(result[0]?.status);
  });
};
