import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import { origin } from "../config/config";
import { router as v1ApiRoutes } from "../routes/index.routes";
import morgan from "morgan";
import { ErrorMiddleware } from "../middleware/error";
import cookieParser from "cookie-parser";
import { main } from "../../scripts/test";
import path from "path";
import createAssessments from "../utils/cron-jobs";


export const app = express();

// cookie parser
app.use(cookieParser());

// Loggin Http requests
app.use(morgan("dev"));

// body parser
app.use(express.json({ limit: "50mb" }));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

//cors4
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:4174", "http://82.112.227.200:4000", "http://82.112.227.200:4000", "https://hrms.cloudprism.in", "https://www.hrms.cloudprism.in"],
    credentials: true,
  })
);

// V1 api routes
app.use("/api/v1", v1ApiRoutes);

main()

// test route
app.get("/api/v1/test", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Api is working",
  });
});

// unknown api request
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`) as any;
  err.status = 404;
  next(err);
});

// middleware
app.use(ErrorMiddleware);

// cron jobs
// createAssessments()