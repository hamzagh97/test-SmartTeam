const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Employees = new Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    vacations: [
      {
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
        },
        userId: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employees", Employees);
