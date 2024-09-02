import bcrypt from "bcryptjs";
import { Schema } from "mongoose";
import { dbConnect } from "../config/dbConnect";
import { Department, IDepartment } from "../models/department.model";
import { Document as Doc } from "../models/documents.model";
import Employee, { EmployeeRole, IEmployee } from "../models/employee.model";
import { Goal } from "../models/goals.model";
import { GoalUpdate } from "../models/goalUpdates.model";
import { GoalVisibility } from "../models/goalVisibility.model";
import { Hierarchy } from "../models/hierarchy.model";
import { Leave } from "../models/leaves.model";
import { Notification } from "../models/notifications.model";
import { PerformanceReview } from "../models/performanceReviews.model";
import { IPosition, Position } from "../models/position.model";
import { TrainingParticipant } from "../models/trainingParticipants.model";
import { Training } from "../models/trainings.model";

let itDepartmentId: Schema.Types.ObjectId | undefined;
let hrDepartmentId: Schema.Types.ObjectId | undefined;
let softwareEngineerPositionId: Schema.Types.ObjectId | undefined;

const departments: Partial<IDepartment>[] = [
  { name: "IT", description: "Information Technology Department" },
  { name: "HR", description: "Human Resources Department" },
];

const positions: Partial<IPosition>[] = [
  { title: "Software Engineer", description: "Develop software applications" },
  { title: "HR Manager", description: "Manage human resources operations" },
];

const employees: Partial<IEmployee>[] = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "1234567890",
    address: "123 Main St, Anytown, USA",
    employeeNumber: "EMP001",
    departmentId: itDepartmentId as Schema.Types.ObjectId,
    positionId: softwareEngineerPositionId as Schema.Types.ObjectId,
    managerId: undefined,
    employmentStatus: "active",
    salary: 50000,
    bonus: 5000,
    commission: 2000,
    jobTitle: "Software Engineer",
    password: bcrypt.hashSync("password", 10),
    role: EmployeeRole.Employee,
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "0987654321",
    address: "456 Oak St, Anycity, USA",
    employeeNumber: "EMP002",
    departmentId: hrDepartmentId as Schema.Types.ObjectId,
    positionId: undefined,
    managerId: undefined,
    employmentStatus: "active",
    salary: 60000,
    bonus: 6000,
    commission: 2500,
    jobTitle: "HR Manager",
    password: bcrypt.hashSync("password", 10),
    role: EmployeeRole.HR,
  },
];

const seedData = async () => {
  try {
    await Promise.all([
      Department.deleteMany({}),
      Doc.deleteMany({}),
      Employee.deleteMany({}),
      Goal.deleteMany({}),
      GoalUpdate.deleteMany({}),
      GoalVisibility.deleteMany({}),
      Hierarchy.deleteMany({}),
      Leave.deleteMany({}),
      Notification.deleteMany({}),
      PerformanceReview.deleteMany({}),
      Position.deleteMany({}),
      Training.deleteMany({}),
      TrainingParticipant.deleteMany({}),
    ]);

    const savedDepartments = await Department.insertMany(
      departments as IDepartment[]
    );
    itDepartmentId = savedDepartments.find((dep) => dep.name === "IT")
      ?._id as Schema.Types.ObjectId;
    hrDepartmentId = savedDepartments.find((dep) => dep.name === "HR")
      ?._id as Schema.Types.ObjectId;

    const savedPositions = await Position.insertMany(positions as IPosition[]);
    softwareEngineerPositionId = savedPositions.find(
      (pos) => pos.title === "Software Engineer"
    )?._id as Schema.Types.ObjectId;

    await Employee.insertMany(
      employees.map((emp) => ({
        ...emp,
        departmentId: emp.departmentId || itDepartmentId,
        positionId: emp.positionId || softwareEngineerPositionId,
      })) as IEmployee[]
    );

    console.log("Data seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

(async () => {
  await dbConnect();
  await seedData();
})();
