import express from "express";
import {
  LoginEmployee,
  logoutEmployee,
  validateSession,
} from "../../controllers/auth.controller";
import { isAuthenticated } from "../../middleware/auth";

export const authRouter = express.Router();

/**
 * @route POST /login
 * @desc Log in an employee
 * @access Public
 */
authRouter.post("/login", LoginEmployee);

/**
 * @route GET /validate-session
 * @desc Validate an employee's session
 * @access Private
 */
authRouter.get("/validate-session", isAuthenticated, validateSession);

/**
 * @route POST /logout
 * @desc Log out an employee
 * @access Private
 */
authRouter.post("/logout", logoutEmployee);
