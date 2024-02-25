const Employees = require("../models/employeeModel");
const Vacation = require("../models/vacationModel");

exports.getAllVacations = (req, res, next) => {
  Vacation.find({ status: "Pending" }).then((result) => {
    res.status(200).json(result);
  });
};

exports.getVacations = async (req, res, next) => {
  const { id } = req.params;
  const Employee = await Employees.findOne({ userId: id });

  if (!Employee) {
    res.status(404).json({ error: "user not found" });
  } else {
    res.status(200).json(Employee.vacations);
  }
};

exports.addVacation = (req, res, next) => {
  const { startDate, endDate, status, comment, userId } = req.body;

  const newVacation = new Vacation({
    startDate,
    endDate,
    status,
    comment,
    userId,
  });

  newVacation.save().then(async (result) => {
    const Employee = await Employees.findOne({ userId });
    Employee.vacations.push(newVacation);

    Employee.save().then((result) => {
      res.status(201).json({
        message: "vacation request added successfully",
      });
    });
  });
};

exports.approveVacation = async (req, res, next) => {
  const { vacationId, userId } = req.body;
  try {
    await Employees.findOneAndUpdate(
      { userId, "vacations._id": vacationId },
      { $set: { "vacations.$.status": "Approved" } },
      { new: true }
    );

    await Vacation.findByIdAndUpdate(vacationId, {
      status: "Approved",
    });

    res.status(200).json({
      message: "Vacation approved successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.deleteVacation = async (req, res, next) => {
  const { vacationId, userId } = req.params;
  try {
    await Employees.findOneAndUpdate(
      { userId },
      { $pull: { vacations: { _id: vacationId } } },
      { new: true }
    );

    await Vacation.findByIdAndDelete(vacationId);

    res.status(200).json({
      message: "Vacation deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};
