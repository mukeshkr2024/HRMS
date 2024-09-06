import mongoose from 'mongoose';
import { Department } from '../models/department.model';
import { Position } from '../models/position.model';
import { PersonalInformation } from '../models/personal-information.model';
import { Compensation } from '../models/compensation.model';
import { Address } from '../models/address.model';
import { ContactInformation } from '../models/contact-information.model';
import { Employee } from '../models/employee.model';

const url = 'mongodb+srv://mukeshmehta2041:ekCNZgnKghBI2JlW@cluster0.ayzqnne.mongodb.net/db'; // Replace with your MongoDB URL
const dbName = 'HRM_DB'; // Replace with your database name

// Function to connect to MongoDB
async function connectToDatabase() {
  try {
    await mongoose.connect(url, { dbName });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

// Function to create and save related documents
async function createRelatedDocuments() {
  try {
    // Create and save department
    const department = await new Department({
      name: "Full Stack Development s1we2d",
      description: 'A department focused on developing full-stack applications'
    }).save();
    const departmentId = department._id;

    // Create and save position
    const position = await new Position({
      name: 'Software Engineer',
      description: 'Develops software applications using various programming languages and frameworks',
    }).save();
    const positionId = position._id;

    // Create and save personal information
    const personalInfo = await new PersonalInformation({
      firstName: "Mukesh",
      middleName: "Kumar",
      lastName: "Mehta",
      preferredName: "Mukesh",
      dateOfBirth: new Date('1990-05-15'),
      gender: 'Male',
      ssn: "123456789",
      maritalStatus: "single"
    }).save();
    const personalInfoId = personalInfo._id;

    // Create and save address
    const address = await new Address({
      street1: '123 Main St',
      street2: 'Apt 4B',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: "india"
    }).save();
    const addressId = address._id;

    // Create and save compensation
    const compensation = await new Compensation({
      paySchedule: 'Weekly',
      payType: 'Salary',
      payRate: 50000,
      payRateType: 'salary',
      ethnicity: 'American'
    }).save();
    const compensationId = compensation._id;

    // Create and save contact information
    const contactInfo = await new ContactInformation({
      workPhone: '123-456-7890',
      mobilePhone: '987-654-3210',
      homePhone: '555-123-4567',
      workEmail: 'john.doe@example.com',
      homeEmail: 'john.doe@example.com',
    }).save();
    const contactInfoId = contactInfo._id;

    // Define educationId
    const educationId = "66daf5fb09dc3927b039fae8"; // Ensure this is a valid ObjectId

    return {
      departmentId,
      positionId,
      personalInfoId,
      addressId,
      compensationId,
      contactInfoId,
      educationId
    };
  } catch (error) {
    console.error('Error creating related documents:', error);
    throw error;
  }
}

// Function to add an employee
async function addEmployee(ids: any) {
  try {
    const { departmentId, positionId, personalInfoId, addressId, compensationId, contactInfoId, educationId } = ids;

    // Hash the password


    const employeeData = {
      employeeNumber: 'EMP001',
      name: 'John Doe',
      hireDate: new Date(),
      departmentId,
      position: positionId,
      jobTitle: 'Software Engineer',
      reportsTo: '66daf5fb09dc3927b039fae8', // Replace with a valid ObjectId
      role: 'employee',
      email: 'john.doe@example.com',
      personalInformation: personalInfoId,
      address: addressId,
      compensation: compensationId,
      contactInformation: contactInfoId,
      password: "hashedPassword",
      status: 'active',
      educations: [educationId],
      languages: ['English', 'Spanish']
    };

    // Create and save employee
    const employee = await new Employee(employeeData).save();
    console.log('Employee added successfully:', employee);
  } catch (error) {
    console.error('Error adding employee:', error);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
  }
}

// Run the script
(async () => {
  try {
    await connectToDatabase();
    const ids = await createRelatedDocuments();
    await addEmployee(ids);
  } catch (error) {
    console.error('An error occurred:', error);
  } finally {
    // Ensure the database connection is closed in case of any error
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
})();
