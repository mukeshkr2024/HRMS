import express from "express";
import {
  LoginEmployee,
  logoutEmployee,
  validateSession,
} from "../../controllers/auth.controller";
import { isAuthenticated } from "../../middleware/auth";
export const authRouter = express.Router();

authRouter.post("/login", LoginEmployee);
authRouter.get("/validate-session", isAuthenticated, validateSession);
authRouter.post("/logout", logoutEmployee);
