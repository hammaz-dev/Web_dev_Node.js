const express = require("express");
const { data } = require("react-router-dom");
const app = express();
const PORT = 3000;

app.use(express.json()); // it handles the json data coming from the client -- it encodes

// Updated student data array with names, sections, and courses
const students = [
  { rollNo: 1, name: "krishna", section: "A", course: "Computer Science" },
  { rollNo: 2, name: "Rahul", section: "B", course: "Information Technology" },
  { rollNo: 3, name: "Anjali", section: "A", course: "Computer Science" },
  { rollNo: 4, name: "Amit", section: "C", course: "Data Science" },
  { rollNo: 5, name: "Priya", section: "B", course: "Information Technology" },
];

////////Read Operation
app.get("/students", (req, res) => {
  res.json(students);
});

app.get("/students/:rollNo", (req, res) => {
  const id = req.params.rollNo;
  const student = students.find((student) => student.rollNo === Number(id));
  if (student == undefined) {
    res.status(404).json({ success: false, message: "student not found" });
  }
  res.json({ success: true, student });
});

app.post("/students", (req, res) => {
  const data = req.body;
  console.log(data);
  students.push({ rollNo: students.length + 1, ...data });
  res.json({ success: true, message: "students created sucessfully", data });
});

// update
// Update
app.put("/students/:rollNo", (req, res) => {
  const id = req.params.rollNo;
  const data = req.body;

  const student = students.find((student) => student.rollNo === Number(id));

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "student not found",
    });
  }

  student.name = data.name;
  student.section = data.section;

  res.json({
    success: true,
    student,
  });
});

// delete

// Delete
app.delete("/students/:rollNo", (req, res) => {
  const id = req.params.rollNo;

  const student = students.find((student) => student.rollNo === Number(id));

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "student not found",
    });
  }

  students.splice(students.indexOf(student), 1);

  res.json({
    success: true,
    message: "student deleted successfully",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
