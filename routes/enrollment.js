import Express from "express";
import { students, enrollments, courses } from "../index.js";

const router = Express.Router();

const validate_student_id = (req, res, next) => {
  const { id } = req.query;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  next();
};

//validation: check if the student id is valid - if they actually exist

// validation: check if the course id is valid - if they actually exist

// Get all enrollments - list all students for a given course
// router.get("/", (req, res) => {
//   return res.json(enrollments);
// });

// Get an enrollment by id
router.get("/", (req, res) => {
  // Query param for course ID
  const the_course_id = req.query.course;
  console.log(the_course_id);

  const enrollment = enrollments.filter((s) => s.course_id === the_course_id);

  if (enrollment) {
    return res.json(enrollment);
  } else {
    return res.status(404).json({ message: "Enrollment not found" });
  }
});

// Create an enrollment
router.post("/", (req, res) => {
  const enrollment_data = req.body;
  console.log(enrollment_data);

  const required_fields = [
    "enrollment_id",
    "student_id",
    "course_id",
    "semester",
  ];

  let missing_fields = [];

  required_fields.forEach((field) => {
    if (!enrollment_data[field]) {
      missing_fields.push(field);
    }
  });

  if (missing_fields.length > 0) {
    return res.status(400).json({
      message: `Missing required fields: ${missing_fields.join(", ")}`,
    });
  }

  enrollments.push(enrollment_data);
  return res.status(201).json(enrollment_data);
});

// remove a student from a course
router.delete("/", (req, res) => {
  const the_student_id = req.query.student_id;
  const the_course_id = req.query.course_id;

  console.log("The student id is: " + the_student_id);
  console.log("The course id is: " + the_course_id);

  const enrollment = enrollments.find(
    (s) => s.student_id == the_student_id && s.course_id == the_course_id
  );
  if (enrollment) {
    const index = enrollments.indexOf(enrollment);
    enrollments.splice(index, 1);
    return res.status(204).json();
  } else {
    return res.status(404).json({ message: "Enrollment not found" });
  }
});

export default router;
