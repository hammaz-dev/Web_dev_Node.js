const express = require("express");
const router = express.Router();

// Simulated database array
let students = [
    { id: 1, name: "Alice Smith", grade: "A", age: 20 },
    { id: 2, name: "Bob Jones", grade: "B", age: 22 }
];

// --- HELPER FUNCTION FOR CLEANER ERRORS ---
const throwError = (msg, status, next) => {
    const err = new Error(msg);
    err.status = status;
    return next(err);
};

// --- CONTROLLER HANDLERS ---

const getAllStudents = (req, res) => 
    res.status(200).json({ success: true, count: students.length, data: students });

const getStudentById = (req, res, next) => {
    const student = students.find(s => s.id === Number(req.params.id));
    return student 
        ? res.status(200).json({ success: true, data: student })
        : throwError(`Student with ID ${req.params.id} not found`, 404, next);
};

const createStudent = (req, res, next) => {
    const { name, grade, age } = req.body;
    if (!name || !grade || !age) return throwError("Missing required fields: name, grade, or age.", 400, next);

    const newStudent = {
        id: students.at(-1)?.id + 1 || 1,
        name,
        grade,
        age: Number(age)
    };
    
    students = [...students, newStudent];
    res.status(201).json({ success: true, message: "Student record created", data: newStudent });
};

const updateStudent = (req, res, next) => {
    const targetId = Number(req.params.id);
    if (!students.some(s => s.id === targetId)) return throwError(`Cannot update. Student ID ${targetId} missing`, 404, next);

    students = students.map(s => s.id === targetId ? { ...s, ...req.body, id: targetId } : s);
    res.status(200).json({ success: true, message: "Student updated", data: students.find(s => s.id === targetId) });
};

const deleteStudent = (req, res, next) => {
    const targetId = Number(req.params.id);
    if (!students.some(s => s.id === targetId)) return throwError(`Cannot delete. Student ID ${targetId} missing`, 404, next);

    students = students.filter(s => s.id !== targetId);
    res.status(200).json({ success: true, message: `Student entry removed` });
};

// --- ROUTE DECLARATIONS (Clean & Chainable) ---

router.route("/students")
    .get(getAllStudents)
    .post(createStudent);

router.route("/students/:id")
    .get(getStudentById)
    .put(updateStudent)
    .delete(deleteStudent);

module.exports = router;
