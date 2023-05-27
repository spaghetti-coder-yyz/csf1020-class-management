import express from "express";
import dotenv from "dotenv";

dotenv.config();

const students = [
  {
    first_name: "John",
    last_name: "Doe",
    student_id: "1",
  },
  {
    first_name: "Jane",
    last_name: "Doe",
    student_id: "2",
  },
];

const enrollments = [
  {
    enrollment_id: "1",
    student_id: "1",
    course_code: "CS100",
    semester: "Fall",
  },
  {
    enrollment_id: "2",
    student_id: "2",
    course_code: "CS101",
    semester: "Summer",
  },
];

const courses = [
  {
    code: "CS100",
    name: "Introduction to Computer Science",
  },
  {
    code: "CS101",
    name: "Introduction to Programming",
  },
];

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

// app.use((req, res, next) => {
//   // global before middleware
//   console.log("Global before middleware");
//   console.log(`Requested URI: ${req.originalUrl}`);
//   next();
// });

// app.use((req, res, next) => {
//   // global after midleware
//   next();
//   console.log(`Finished request: ${req.originalUrl}`);
// });

app.get("/", (req, res) => {
  res.send("Student Management API is running...");
});

// Create routes here
app.get("/students", (req, res) => {
  res.json(students);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
