const express = require("express");
const router = express.Router();

// Mock data array simulating a student database
let students = [
    { id: 1, name: "Alice Smith", grade: "A", age: 20 },
    { id: 2, name: "Bob Jones", grade: "B", age: 22 }
];

// 1. GET ALL STUDENTS
// Endpoint: GET /students
router.get("/students", (req, res) => {
    res.status(200).json({
        success: true,
        count: students.length,
        data: students
    });
});

// 2. GET SINGLE STUDENT BY ID
// Endpoint: GET /students/:id
router.get("/students/:id", (req, res, next) => {
    const studentId = parseInt(req.params.id);
    const student = students.find((s) => s.id === studentId);

    if (!student) {
        // Creates a new error and passes it down to your server's global error handler
        const error = new Error(`Student with ID ${studentId} not found`);
        error.status = 404;
        return next(error);
    }

    res.status(200).json({
        success: true,
        data: student
    });
});

// 3. CREATE NEW STUDENT
// Endpoint: POST /students
router.post("/students", (req, res, next) => {
    const { name, grade, age } = req.body;

    // Simple validation constraint
    if (!name || !grade || !age) {
        const error = new Error("Please provide name, grade, and age fields.");
        error.status = 400;
        return next(error);
    }

    const newStudent = {
        id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
        name,
        grade,
        age: parseInt(age)
    };

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "Student added successfully",
        data: newStudent
    });
});

// 4. UPDATE EXISTING STUDENT
// Endpoint: PUT /students/:id
router.put("/students/:id", (req, res, next) => {
    const studentId = parseInt(req.params.id);
    const studentIndex = students.findIndex((s) => s.id === studentId);

    if (studentIndex === -1) {
        const error = new Error(`Cannot update. Student with ID ${studentId} not found`);
        error.status = 404;
        return next(error);
    }

    // Merge existing details with updated payload fields
    students[studentIndex] = {
        ...students[studentIndex],
        ...req.body,
        id: studentId // Ensure the ID cannot be overwritten by req.body
    };

    res.status(200).json({
        success: true,
        message: "Student profile updated",
        data: students[studentIndex]
    });
});

// 5. DELETE STUDENT
// Endpoint: DELETE /students/:id
router.delete("/students/:id", (req, res, next) => {
    const studentId = parseInt(req.params.id);
    const studentExists = students.some((s) => s.id === studentId);

    if (!studentExists) {
        const error = new Error(`Cannot delete. Student with ID ${studentId} not found`);
        error.status = 404;
        return next(error);
    }

    students = students.filter((s) => s.id !== studentId);

    res.status(200).json({
        success: true,
        message: `Student with ID ${studentId} has been removed`
    });
});

module.exports = router;
