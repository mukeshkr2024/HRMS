import bcrypt from 'bcryptjs';


const departments = [
  { name: 'IT', description: 'Information Technology Department' },
  { name: 'HR', description: 'Human Resources Department' },
];

const positions = [
  { title: 'Software Engineer', description: 'Develop software applications' },
  { title: 'HR Manager', description: 'Manage human resources operations' },
];

const employees = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    employeeNumber: 'EMP001',
    departmentId: "itDepartmentId",
    positionId: "softwareEngineerPositionId",
    managerId: undefined,
    employmentStatus: 'active',
    salary: 50000,
    bonus: 5000,
    commission: 2000,
    jobTitle: 'Software Engineer',
    password: bcrypt.hashSync('password', 10),
  },
  {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '0987654321',
    employeeNumber: 'EMP002',
    departmentId: "hrDepartmentId",
    positionId: undefined,
    managerId: undefined,
    employmentStatus: 'active',
    salary: 60000,
    bonus: 6000,
    commission: 2500,
    jobTitle: 'HR Manager',
    password: bcrypt.hashSync('password', 10),
  },
];

