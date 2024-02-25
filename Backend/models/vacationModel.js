const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vacation = new Schema(
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
  { timestamps: true }
);

module.exports = mongoose.model("Vacation", Vacation);
