const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/employees", employeeController.getEmployees);
router.get("/status/:id", employeeController.getStatus);

module.exports = router;
