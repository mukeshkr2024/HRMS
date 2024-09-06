import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { Employee } from "../models/employee.model";
import { ErrorHandler } from "../utils/ErrorHandler";
import { PersonalInformation } from "../models/personal-information.model";
import { Address } from "../models/address.model";
import { Compensation } from "../models/compensation.model";
import { ContactInformation } from "../models/contact-information.model";
import { Department } from "../models/department.model";
import { Position } from "../models/position.model";

export const createEmployee = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employeeNumber, jobDetails, jobInformation, contactInformation, personalInformation, address, compensation } = req.body;

      if (!employeeNumber || !jobDetails || !jobInformation || !contactInformation || !personalInformation || !address || !compensation) {
        return res.status(400).json({ message: "All fields are required." });
      }

      const { hireDate } = jobDetails;
      const { firstName, middleName, lastName, preferredName, birthDate, gender, maritalStatus, ssn } = personalInformation;
      const { department, jobTitle } = jobInformation;
      const { workEmail, workPhone, mobilePhone, homePhone, homeEmail } = contactInformation;
      const { street1, street2, city, state, zipCode, country } = address;
      const { paySchedule, payType, payRate, payRateType, ethnicity } = compensation;

      // Validate email and employee number uniqueness
      const existingEmployee = await Employee.findOne({
        $or: [
          { employeeNumber },
          { email: workEmail }
        ]
      });

      if (existingEmployee) {
        return res.status(400).json({
          message: "Employee already exists with this employee number or email."
        });
      }

      // Create associated documents
      const [personalInfo, addressInfo, compensationInfo, contactInfo] = await Promise.all([
        PersonalInformation.create({
          firstName,
          middleName,
          lastName,
          preferredName,
          dateOfBirth: birthDate,
          gender,
          maritalStatus,
          ssn,
        }),
        Address.create({
          street1,
          street2,
          city,
          state,
          zipCode,
          country,
        }),
        Compensation.create({
          paySchedule,
          payType,
          payRate,
          payRateType,
          ethnicity,
        }),
        ContactInformation.create({
          workPhone,
          workEmail,
          mobilePhone,
          homePhone,
          homeEmail,
        }),
      ]);


      // Create the employee document
      const employee = await Employee.create({
        employeeNumber,
        hireDate: new Date(hireDate), // Ensure hireDate is a Date object
        name: `${firstName} ${middleName} ${lastName}`,
        departmentId: department,
        position: jobTitle,
        jobTitle,
        password: "password",
        email: workEmail,
        personalInformation: personalInfo._id,
        address: addressInfo._id,
        compensation: compensationInfo._id,
        contactInformation: contactInfo._id,
        reportsTo: "66d59c9fbc525e0b9b9c882e",
      });

      console.log("Employee created: ", employee);

      // Return success response
      return res.status(201).json({
        success: true,
        data: employee,
      });
    } catch (error) {
      return next(new ErrorHandler(error || "An error occurred while creating the employee.", 400));
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

      const employeeId = await req.employee._id;

      const employee = await Employee.findById(employeeId).populate({
        path: "personalInformation"
      }).populate({
        path: "address"
      }).populate({
        path: "contactInformation"
      })

      return res.status(200).json(employee);
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  }
)

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
      const employee = await Employee.findByIdAndUpdate(
        req.params.employeeId,
        req.body,
        { new: true }
      );

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