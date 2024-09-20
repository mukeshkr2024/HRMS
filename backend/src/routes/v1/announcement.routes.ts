import express from "express";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
} from "../../controllers/announcement.controller";
import { authorizeRoles, isAuthenticated } from "../../middleware/auth";

export const announcementRouter = express.Router();

// Create a new announcement
announcementRouter.post("/", isAuthenticated, authorizeRoles("admin"), createAnnouncement);

// Get all announcements
announcementRouter.get("/", isAuthenticated, getAllAnnouncements);


// Delete an announcement by ID
announcementRouter.delete("/:announcementId", isAuthenticated, deleteAnnouncement);
