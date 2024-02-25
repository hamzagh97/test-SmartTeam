const express = require("express");
const router = express.Router();
const vacationController = require("../controllers/vacationController");

router.get("/vacations", vacationController.getAllVacations);
router.post("/vacations", vacationController.addVacation);
router.get("/:id/vacations", vacationController.getVacations);
router.put("/vacations", vacationController.approveVacation);
router.delete(
  "/vacations/:userId/:vacationId",
  vacationController.deleteVacation
);

module.exports = router;
