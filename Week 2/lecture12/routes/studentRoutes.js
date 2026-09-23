const express = require("express");
const router = express.Router();
const studentController = require("../controller/studentController");

router.get("/students", studentController.getStudents);
router.get("/students/:rollNo", studentController.getStudentById);
router.post("/students", studentController.addStudent);

// Update Operation
router.put("/students/:rollNo", studentController.updateStudent);

// Delete Operation
router.delete("/students/:rollNo", studentController.deleteStudent);

module.exports = router;