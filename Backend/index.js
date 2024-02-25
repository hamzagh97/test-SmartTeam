const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const employeeRoutes = require("./routes/employeeRoutes");
const vacationRoutes = require("./routes/vacationRoutes");
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });
const PORT = process.env.PORT || 5000;
const db = process.env.db;
var cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.use(employeeRoutes);
app.use(vacationRoutes);

mongoose
  .connect(db)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`app runing on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
