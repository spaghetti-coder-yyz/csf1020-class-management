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
  return res.json(courses);
});

// Get a course by id
router.get("/:id", validate_id, (req, res) => {
  const course = courses.find((s) => s.course_id === req.params.id);
  if (course) {
    return res.json(course);
  } else {
    return res.status(404).json({ message: "Course not found" });
  }
});

// Create a course
router.post("/", (req, res) => {
  const course_data = req.body;
  console.log(course_data);

  const required_fields = ["course_id", "code", "name"];

  let missing_fields = [];

  required_fields.forEach((field) => {
    if (!course_data[field]) {
      missing_fields.push(field);
    }
  });

  if (missing_fields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missing_fields.join(", ")}`,
    });
  }

  courses.push(course_data);
  return res.status(201).json(course_data);
});

// update a course
router.put("/:id", validate_id, (req, res) => {
  const { id } = req.params;
  const course_data = req.body;

  const course = courses.find((s) => s.course_id == id);
  if (course) {
    const index = courses.indexOf(course);
    courses[index] = course_data;
    return res.json(course_data);
  } else {
    return res.status(404).json({ message: "Course not found" });
  }
});

// delete a course
router.delete("/:id", validate_id, (req, res) => {
  const { id } = req.params;
  const course = courses.find((s) => s.course_id == id);
  if (course) {
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    return res.status(204).json();
  } else {
    return res.status(404).json({ message: "Course not found" });
  }
});

export default router;
