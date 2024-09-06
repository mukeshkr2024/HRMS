import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncError";
import { Employee } from "../models/employee.model";
import { ErrorHandler } from "../utils/ErrorHandler";
import { PersonalInformation } from "../models/personal-information.model";
import { Address } from "../models/address.model";
import { Compensation } from "../models/compensation.model";
import { ContactInformation } from "../models/contact-information.model";

export const createEmployee = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { employeeNumber, jobDetails, jobInformation, contactInformation, personalInformation, address, compensation } = req.body;

      const { hireDate } = jobDetails;
      const { firstName, middleName, lastName, preferredName, birthDate, gender, maritalStatus, ssn } = personalInformation;
      const { department, jobTitle } = jobInformation;
      const { workEmail, workPhone, mobilePhone, homePhone, homeEmail } = contactInformation;
      const { street1, street2, city, state, zipCode, country } = address;
      const { paySchedule, payType, payRate, payRateType, ethnicity } = compensation;

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
        hireDate,
        departmentId: department || "66d59c9fbc525e0b9b9c882e", // Fallback for department
        positionId: jobTitle || "66d59c9fbc525e0b9b9c882e", // Fallback for job title
        jobTitle,
        password: "password", // Hash the password
        email: workEmail,
        personalInformation: personalInfo._id,
        address: addressInfo._id,
        compensation: compensationInfo._id,
        contactInformation: contactInfo._id,
        reportsTo: "66d59c9fbc525e0b9b9c882e", // Fallback for manager
      });

      // Log created employee (for debugging)
      console.log("Employee created: ", employee);

      // Return success response
      return res.status(201).json({
        success: true,
        data: employee,
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
