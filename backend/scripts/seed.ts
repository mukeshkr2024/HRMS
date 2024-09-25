import { Address } from "../src/models/address.model";
import { Compensation } from "../src/models/compensation.model";
import { ContactInformation } from "../src/models/contact-information.model";
import { Department } from "../src/models/department.model";
import { Employee } from "../src/models/employee.model";
import { PersonalInformation } from "../src/models/personal-information.model";
import { Position } from "../src/models/position.model";

export const SeedData = async () => {
    try {
        await Department.deleteMany();
        await Position.deleteMany();
        await PersonalInformation.deleteMany();
        await Compensation.deleteMany();
        await Address.deleteMany();
        await Employee.deleteMany();

        // Create Department
        const department = await Department.create({
            name: "Full Stack Development",
            description: "A department focused on developing full-stack applications"
        });

        // Create Position
        const position = await Position.create({
            name: "Software Engineer",
            description: "Develops software applications using various programming languages and frameworks"
        });

        // Create Personal Information
        const personalInformation = await PersonalInformation.create({
            firstName: "Mukesh",
            lastName: "Kumar",
            middleName: "",
            preferredName: "Mukesh",
            dateOfBirth: new Date('1990-05-15'),
            gender: 'Male',
            maritalStatus: "Single"
        });

        // Create Address
        const address = await Address.create({
            street1: '123 Main St',
            street2: 'Apt 4B',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345',
            country: "India" // Fixed country name capitalization
        });

        // Create Compensation
        const compensation = await Compensation.create({
            paySchedule: 'Weekly',
            payType: 'Salary',
            payRate: 50000,
            payRateType: 'hourly', // Fixed capitalization
            ethnicity: "Indian" // Fixed capitalization
        });

        // Create Contact Information
        const contactInformation = await ContactInformation.create({
            workPhone: '123-456-7890',
            workEmail: 'mukeshkumar@cloudprism.in',
            mobilePhone: '987-654-3210',
            homePhone: '555-123-4567',
            homeEmail: 'mukeshkumar@cloudprism.in',
        });

        // Create Employee
        const employee = {
            employeeNumber: "E001",
            name: "John Doe",
            hireDate: new Date("2021-01-01"),
            department: department._id,
            position: position._id,
            jobTitle: position.name,
            reportsTo: position._id,
            role: "admin", // Fixed capitalization
            email: "mukeshkumar@cloudprism.in",
            personalInformation: personalInformation._id,
            address: address._id,
            compensation: compensation._id,
            contactInformation: contactInformation._id,
            password: "password", // Consider hashing passwords before storing
            status: "active", // Fixed capitalization
            avatar: "https://example.com/avatar.jpg",
            workLocation: "Remote",
            educations: [
                {
                    college: "University of XYZ",
                    degree: "Bachelor of Science",
                    specialization: "Computer Science",
                    gpa: "3.8",
                    startDate: new Date("2015-09-01"),
                    endDate: new Date("2019-05-30"),
                },
            ],
            languages: ["English", "Spanish"],
        };

        const createdEmployee = await Employee.create(employee);

        if (!createdEmployee) {
            throw new Error("Employee creation failed");
        }

        // Update Position and Department with new employee
        await Position.updateOne({ _id: position._id }, { $push: { employees: createdEmployee._id } });
        await Department.updateOne({ _id: department._id }, { $push: { employees: createdEmployee._id } });

    } catch (error) {
        console.error("Error in seeding data:", error);
    }
};
