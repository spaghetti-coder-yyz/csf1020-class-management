import Express from "express";
import { students, enrollments, courses } from "../index.js";

const router = Express.Router();

const validate_id = (req, res, next) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  next();
};

// Get all students
router.get("/", (req, res) => {
  return res.json(students);
});

// Get a student by id
router.get("/:id", validate_id, (req, res) => {
  const student = students.find((s) => s.student_id === req.params.id);
  if (student) {
    return res.json(student);
  } else {
    return res.status(404).json({ message: "Student not found" });
  }
});

// Create a student
router.post("/", (req, res) => {
  const student_data = req.body;
  console.log(student_data);

  const required_fields = ["student_id", "first_name", "last_name", "email"];

  let missing_fields = [];

  required_fields.forEach((field) => {
    if (!student_data[field]) {
      missing_fields.push(field);
    }
  });

  if (missing_fields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missing_fields.join(", ")}`,
    });
  }

  students.push(student_data);
  return res.status(201).json(student_data);
});

// update a student
router.put("/:id", validate_id, (req, res) => {
  const { id } = req.params;
  const student_data = req.body;

  const student = students.find((s) => s.student_id == id);
  if (student) {
    const index = students.indexOf(student);
    students[index] = student_data;
    return res.json(student_data);
  } else {
    return res.status(404).json({ message: "Student not found" });
  }
});

// delete a student
router.delete("/:id", validate_id, (req, res) => {
  const { id } = req.params;
  const student = students.find((s) => s.student_id == id);
  if (student) {
    const index = students.indexOf(student);
    students.splice(index, 1);
    return res.status(204).json();
  } else {
    return res.status(404).json({ message: "Student not found" });
  }
});

export default router;
