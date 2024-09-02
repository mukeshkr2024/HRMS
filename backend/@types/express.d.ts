import { Request } from "express";
import { IEmployee } from "../src/models/employee.model";

declare global {
  namespace Express {
    interface Request {
      employee: IEmployee;
    }
  }
}
