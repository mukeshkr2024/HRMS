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
import { Schema } from "mongoose";
import { isValidObjectId } from "../utils";

export const createEmployee = CatchAsyncError(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      employeeNumber,
      jobDetails: { hireDate },
      jobInformation: { department, jobTitle, reportsTo, location },
      contactInformation: { workEmail, workPhone, mobilePhone, homePhone, homeEmail },
      personalInformation: { firstName, middleName, lastName, preferredName, birthDate, gender, maritalStatus, uan, pan },
      address: { street1, street2, city, state, zipCode, country },
      compensation: { paySchedule, payType, payRate, payRateType },
      password
    } = req.body;

    // Validate required fields
    if (!employeeNumber || !hireDate || !department || !jobTitle || !workEmail || !firstName || !lastName || !paySchedule || !payType || !payRate || !payRateType) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const workEmailLower = workEmail.trim().toLowerCase();
    const homeEmailLower = homeEmail?.trim().toLowerCase();

    // Check if employee number or email already exists
    const existingEmployee = await Employee.findOne({
      $or: [{ employeeNumber }, { email: workEmailLower }],
    });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee with this number or email already exists." });
    }

    // Validate department and job title
    const [departmentFound, positionFound] = await Promise.all([
      Department.findById(department),
      Position.findById(jobTitle)
    ]);

    if (!departmentFound || !positionFound) {
      return res.status(404).json({ message: !departmentFound ? "Department not found." : "Position not found." });
    }

    // Validate hire date
    const parsedHireDate = new Date(hireDate);
    if (isNaN(parsedHireDate.getTime())) {
      return res.status(400).json({ message: "Invalid hire date format." });
    }

    // Create related sub-documents
    const [personalInfo, addressInfo, compensationInfo, contactInfo] = await Promise.all([
      PersonalInformation.create({
        firstName: firstName.trim(),
        middleName: middleName?.trim(),
        lastName: lastName.trim(),
        preferredName: preferredName?.trim(),
        dateOfBirth: new Date(birthDate),
        gender,
        maritalStatus,
        uan,
        pan,
      }),
      Address.create({
        street1, street2, city, state, zipCode, country
      }),
      Compensation.create({
        paySchedule, payType, payRate, payRateType
      }),
      ContactInformation.create({
        workPhone,
        workEmail: workEmailLower,
        mobilePhone,
        homePhone,
        homeEmail: homeEmailLower
      })
    ]);

    // Create employee document
    const employee = await Employee.create({
      employeeNumber,
      hireDate: parsedHireDate,
      name: `${firstName.trim()} ${middleName?.trim()} ${lastName.trim()}`,
      department: departmentFound._id,
      position: positionFound._id,
      jobTitle: positionFound.name,
      password, // Hash password in production
      email: workEmailLower,
      personalInformation: personalInfo._id,
      address: addressInfo._id,
      compensation: compensationInfo._id,
      contactInformation: contactInfo._id,
      reportsTo: reportsTo || null,
      workLocation: location,
    });

    // Update department and position with new employee
    departmentFound.employees.push(employee._id as Schema.Types.ObjectId);
    positionFound.employees.push(employee._id as Schema.Types.ObjectId);
    await Promise.all([departmentFound.save(), positionFound.save()]);

    return res.status(201).json({
      success: true,
      data: employee,
    });
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
});


export const getAllEmployees = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const employees = await Employee.find()
        .populate("personalInformation address contactInformation")

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

      if (employee) {
        if (!isValidObjectId(employee)) {
          return next(new ErrorHandler("Invalid Employee ID format", 400));
        }
      }

      // Use employee query parameter if provided, otherwise use authenticated employee's ID
      const employeeId = employee ? employee : req.employee?._id;

      // Validate employee ID presence
      if (!employeeId) {
        return next(new ErrorHandler("Employee ID is required", 400));
      }


      // Populate paths based on conditions
      const populatePaths = [
        { path: 'personalInformation', select: '-createdAt -updatedAt' },
        { path: 'address', select: '-createdAt -updatedAt' },
        { path: 'contactInformation', select: '-createdAt -updatedAt' },
        { path: 'reportsTo', select: 'name' },
        { path: 'position', select: 'name' },
        { path: 'department', select: 'name' }
      ];

      if (employee) {
        populatePaths.push({ path: 'compensation', select: '-createdAt -updatedAt' });
      }

      // Fetch employee details and populate necessary fields
      const employeeDetails = await Employee.findById(employeeId)
        .populate(populatePaths)
        .select('-createdAt -updatedAt -password');

      if (!employeeDetails) {
        return next(new ErrorHandler("Employee not found", 404));
      }

      return res.status(200).json(
        employeeDetails,
      );
    } catch (error) {
      return next(new ErrorHandler(error as Error, 500));
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

      const updatedAddress = address && await Address.findByIdAndUpdate(
        employee.address,
        address,
        { new: true }
      );

      const updatedCompensation = compensation && await Compensation.findByIdAndUpdate(
        employee.compensation,
        compensation,
        { new: true }
      );

      const updatedContactInfo = contactInformation && await ContactInformation.findByIdAndUpdate(
        employee.contactInformation,
        {
          ...contactInformation,
          workEmail: contactInformation?.workEmail?.trim().toLowerCase(),
          homeEmail: contactInformation?.homeEmail?.trim().toLowerCase(),
        },
        { new: true }
      );

      const updatedEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        {
          employeeNumber: employeeNumber || employee.employeeNumber,
          hireDate: jobDetails?.hireDate ? new Date(jobDetails.hireDate) : employee.hireDate,
          status: jobDetails?.employmentStatus || employee.status,
          department: jobInformation?.department || employee.department,
          position: jobInformation?.jobTitle || employee.position,
          reportsTo: jobInformation?.reportsTo || employee.reportsTo,
          role: role || employee.role,
          email: contactInformation?.workEmail?.trim().toLowerCase() || employee.email,
          name: personalInformation
            ? `${personalInformation?.firstName?.trim()} ${personalInformation?.middleName?.trim()} ${personalInformation?.lastName?.trim()}`
            : employee.name,
          workLocation: workLocation || employee.workLocation,
        },
        { new: true }
      );

      if (!updatedEmployee) {
        return next(new ErrorHandler('Employee update failed', 400));
      }

      if (password) {
        updatedEmployee.password = password;
        await updatedEmployee.save();
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

