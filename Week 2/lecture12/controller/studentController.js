const students = require("../data/studentData");

// 1. Get all students
const getStudents = (req, res) => {
    return res.json(students);
};

// 2. Get a single student by Roll Number
const getStudentById = (req, res) => {
    const id = req.params.rollNo;
    const student = students.find((student) => student.rollNo === Number(id));
    
    if (!student) {
        return res.status(404).json({ 
            success: false, 
            message: "student not found" 
        });
    }
    
    return res.json({ success: true, student });
};

// 3. Create a new student
const addStudent = (req, res) => {
    const data = req.body;
    
    // Safely generate a unique roll number even if items are deleted
    const nextRollNo = students.length > 0 
        ? Math.max(...students.map(s => s.rollNo)) + 1 
        : 1;

    const newStudent = { rollNo: nextRollNo, ...data };
    students.push(newStudent);
    
    return res.json({ 
        success: true, 
        message: "student created successfully", 
        data: newStudent 
    });
};

// 4. Update an existing student
const updateStudent = (req, res) => {
    const id = req.params.rollNo;
    const data = req.body;

    const student = students.find((student) => student.rollNo === Number(id));

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    student.name = data.name;
    student.section = data.section;

    return res.json({
        success: true,
        student: student
    });
};

// 5. Delete a student
const deleteStudent = (req, res) => {
    const id = req.params.rollNo;
    const student = students.find((student) => student.rollNo === Number(id));

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "student not found",
        });
    }

    students.splice(students.indexOf(student), 1);

    return res.json({
        success: true,
        message: "student deleted successfully",
    });
};

// CRITICAL FIX: Export all functions so app.js can read them
module.exports = {
    getStudents,
    getStudentById,
    addStudent,
    updateStudent,
    deleteStudent
};
