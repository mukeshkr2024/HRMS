import { NextFunction, query, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { Employee } from "../models/employee.model";
import { ErrorHandler } from "../utils/ErrorHandler";
import { PersonalInformation } from "../models/personal-information.model";
import { Address } from "../models/address.model";
import { Compensation } from "../models/compensation.model";
import { ContactInformation } from "../models/contact-information.model";
import { Department } from "../models/department.model";
import { Position } from "../models/position.model";
import path from "path"
import { API_URL } from "../config/config";
import mongoose from "mongoose";

export const createEmployee = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {

    try {
      const { employeeNumber, jobDetails, jobInformation, contactInformation, personalInformation, address, compensation, password } = req.body;

      // Check for required fields
      if (!employeeNumber || !jobDetails || !jobInformation || !contactInformation || !personalInformation || !address || !compensation) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const { hireDate } = jobDetails;
      const { firstName, middleName, lastName, preferredName, birthDate, gender, maritalStatus } = personalInformation;
      const { department, jobTitle, reportsTo, location } = jobInformation;
      const { workEmail, workPhone, mobilePhone, homePhone, homeEmail } = contactInformation;
      const { street1, street2, city, state, zipCode, country } = address;
      const { paySchedule, payType, payRate, payRateType } = compensation;

      // Validate email and employee number uniqueness
      const existingEmployee = await Employee.findOne({
        $or: [{ employeeNumber }, { email: workEmail.trim() }],
      });

      if (existingEmployee) {
        return res.status(400).json({ message: "Employee with this number or email already exists." });
      }

      // Validate department and job title
      const departmentFound = await Department.findById(department);
      if (!departmentFound) {
        return res.status(404).json({ message: "Department not found." });
      }

      const positionFound = await Position.findById(jobTitle);
      if (!positionFound) {
        return res.status(404).json({ message: "Position not found." });
      }

      // Ensure hire date is a valid date
      const parsedHireDate = new Date(hireDate);
      if (isNaN(parsedHireDate.getTime())) {
        return res.status(400).json({ message: "Invalid hire date format." });
      }

      // Create related sub-documents
      const [personalInfo, addressInfo, compensationInfo, contactInfo] = await Promise.all([
        PersonalInformation.create(
          [
            {
              firstName: firstName.trim(),
              middleName: middleName?.trim(),
              lastName: lastName.trim(),
              preferredName: preferredName?.trim(),
              dateOfBirth: new Date(birthDate),
              gender,
              maritalStatus,
            },
          ],
        ),
        Address.create(
          [
            {
              street1,
              street2,
              city,
              state,
              zipCode,
              country,
            },
          ],
        ),
        Compensation.create(
          [
            {
              paySchedule,
              payType,
              payRate,
              payRateType,
            },
          ],
        ),
        ContactInformation.create(
          [
            {
              workPhone,
              workEmail: workEmail.trim(),
              mobilePhone,
              homePhone,
              homeEmail: homeEmail?.trim(),
            },
          ],
        ),
      ]);

      const employee = await Employee.create(
        [
          {
            employeeNumber,
            hireDate: parsedHireDate,
            name: `${firstName.trim()} ${middleName?.trim()} ${lastName.trim()}`,
            department: departmentFound._id,
            position: positionFound._id,
            jobTitle: positionFound.name,
            password: password, // Ensure to hash the password before use in production
            email: workEmail.trim(),
            personalInformation: personalInfo[0]._id,
            address: addressInfo[0]._id,
            compensation: compensationInfo[0]._id,
            contactInformation: contactInfo[0]._id,
            reportsTo: reportsTo || null,
            workLocation: location
          },
        ],
      );

      // @ts-ignore
      departmentFound.employees.push(employee[0]._id);
      // @ts-ignore
      positionFound.employees.push(employee[0]._id);

      await Promise.all([departmentFound.save(), positionFound.save()]);


      return res.status(201).json({
        success: true,
        data: employee[0],
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const getAllEmployees = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employees = await Employee.find()
        .populate("personalInformation address contactInformation")

      console.log(employees);

      return res.status(200).json(
        employees,
      );
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const getEmployeeInfo = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employee } = req.query;
      const employeeId = employee ? employee : req.employee._id;

      if (!employeeId) {
        throw new Error("Employee ID is required");
      }

      let populatePaths = [
        { path: 'personalInformation' }, // add later select
        { path: 'address' },
        { path: 'contactInformation' },
        { path: 'reportsTo' },
        { path: 'position' },
        { path: 'department' }
      ];

      if (employee) {
        populatePaths.push({ path: 'compensation' });
      }

      const employeeDetails = await Employee.findById(employeeId)
        .populate(populatePaths);

      console.log("employeeDetails", employeeDetails);


      if (!employeeDetails) {
        throw new Error("Employee not found");
      }

      return res.status(200).json(employeeDetails);
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);


export const getEmployeeById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = await Employee.findById(req.params.employeeId);

      if (!employee) {
        return next(new ErrorHandler("Employee not found", 404));
      }

      return res.status(200).json({
        employee,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const deleteEmployeeById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.employeeId);
      if (!employee) {
        return next(new ErrorHandler("Employee not found", 404));
      }
      return res.status(200).json({
        employee,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
);

export const updateEmployeeById = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        employeeNumber, personalInformation, address, compensation, contactInformation,
        jobDetails, jobInformation, role, workLocation, password
      } = req.body;

      const employeeId = req.params.employeeId;

      const employee = await Employee.findById(employeeId);

      if (!employee) {
        return next(new ErrorHandler('Employee not found', 404));
      }

      const updatedPersonalInfo = await PersonalInformation.findByIdAndUpdate(
        employee.personalInformation,
        { ...personalInformation, dateOfBirth: new Date(personalInformation.birthDate) },
        { new: true }
      );

      const updatedAddress = await Address.findByIdAndUpdate(
        employee.address,
        address,
        { new: true }
      );

      const updatedCompensation = await Compensation.findByIdAndUpdate(
        employee.compensation,
        compensation,
        { new: true }
      );

      const updatedContactInfo = await ContactInformation.findByIdAndUpdate(
        employee.contactInformation,
        contactInformation,
        { new: true }
      );

      const updatedEmployee: any = await Employee.findByIdAndUpdate(
        employeeId,
        {
          employeeNumber,
          hireDate: new Date(jobDetails.hireDate),
          status: jobDetails.employmentStatus,
          department: jobInformation.department,
          position: jobInformation.jobTitle,
          reportsTo: jobInformation.reportsTo,
          role,
          workLocation,
        },
        { new: true }
      );

      // Manually handle password update
      if (password) {
        updatedEmployee.password = password;
        // Call save() so pre('save') middleware is triggered for hashing
        await updatedEmployee.save();

        console.log(updatedEmployee);

      }

      if (!updatedEmployee) {
        return next(new ErrorHandler('Employee update failed', 400));
      }

      return res.status(200).json({
        employee: updatedEmployee,
      });
    } catch (error) {
      return next(new ErrorHandler(error || 'Internal Server Error', 500));
    }
  }
);

export const getEmployeeOptions = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      const departments = await Department.find({}, { name: 1 });

      const profiles = await Position.find({}, { name: 1 });

      const employees = await Employee.find({}, {
        personalInformation: 1,
        position: 1
      }).populate("personalInformation position");

      const formattedEmployees = employees.map(employee => {
        // @ts-ignore
        const firstName = employee.personalInformation?.firstName || "";
        // @ts-ignore
        const lastName = employee.personalInformation?.lastName || "";
        const fullName = `${firstName} ${lastName}`.trim();

        return {
          _id: employee._id,
          name: fullName || "Unnamed Employee",
        };
      });

      return res.status(200).json({
        departments,
        profiles,
        employees: formattedEmployees,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
)

export const uploadAvatar = CatchAsyncError(async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  let filePath = path.posix.join("/uploads/avatars/", req.file.filename);
  filePath = filePath.replace(/\\/g, '/');

  const avatar_url = `${process.env.API_URL}${filePath}`;

  try {
    const employeeId = req.employee.id;
    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, {
      avatar: avatar_url,
    }, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    res.status(200).json({ message: "Avatar uploaded successfully." });
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ message: "Server error." });
  }
});

export const updateMyInfo = CatchAsyncError(async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { address, contactInformation, languages, educations } = req.body;

    // Find the employee
    const employee = await Employee.findById(req.employee.id).exec();

    if (!employee) {
      return next(new ErrorHandler("Employee not found", 404));
    }

    // Update address if provided
    if (address) {
      await Address.findByIdAndUpdate(employee.address, address, { new: true }).exec();
    }

    // Update contact information if provided
    if (contactInformation) {
      await ContactInformation.findByIdAndUpdate(employee.contactInformation, contactInformation, { new: true }).exec();
    }

    // Update languages
    if (languages) {
      employee.languages = languages.map((language: { name: string }) => language.name);
    }

    if (educations) {
      employee.educations = educations.map((education: { college: string, degree: string, specialization: string, gpa: string, startDate: string, endDate: string }) => ({
        college: education.college,
        degree: education.degree,
        specialization: education.specialization,
        gpa: education.gpa,
        startDate: education.startDate,
        endDate: education.endDate
      }));
    }

    // Save the updated employee
    const updatedEmployee = await employee.save();

    return res.status(200).json(updatedEmployee);
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});