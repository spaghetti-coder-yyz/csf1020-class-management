import express from "express";
import dotenv from "dotenv";
import student_route from "./routes/student.js";
import course_route from "./routes/course.js";
import enrollment_route from "./routes/enrollment.js";

dotenv.config();

export const students = [
  {
    first_name: "John",
    last_name: "Doe",
    student_id: 1,
    email: "john@noemail.com",
  },
  {
    first_name: "Jane",
    last_name: "Doe",
    student_id: 2,
    email: "jane@noemail.com",
  },
];

export const enrollments = [
  {
    enrollment_id: "1",
    student_id: "1",
    course_id: "1",
    semester: "Fall",
  },
  {
    enrollment_id: "2",
    student_id: "2",
    course_id: "2",
    semester: "Summer",
  },
  {
    enrollment_id: "3",
    student_id: "1",
    course_id: "2",
    semester: "Spring",
  },
];

export const courses = [
  {
    course_id: "1",
    code: "CS100",
    name: "Introduction to Computer Science",
  },
  {
    course_id: "2",
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

const password = process.env.PASSWORD;

const authenticate = (req, res, next) => {
  if (req.headers.password !== password) {
    return res.status(401).json({ message: "Unauthorized" });
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.send("Student Management API is running...");
});

// Create routes here

// Apply authentication middleware to all routes under here
app.use(authenticate);
app.use("/student", student_route);
app.use("/course", course_route);
app.use("/enrollment", enrollment_route);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
