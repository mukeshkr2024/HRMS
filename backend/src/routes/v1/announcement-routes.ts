import express from "express";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  getAnnouncementById,
  updateAnnouncement,
} from "../../controllers/announcement.controller";
import { isAuthenticated } from "../../middleware/auth";

export const announcementRouter = express.Router();

announcementRouter.post("/", isAuthenticated, createAnnouncement);
announcementRouter.get("/", isAuthenticated, getAllAnnouncements);
announcementRouter.get(
  "/:announcementId",
  isAuthenticated,
  getAnnouncementById
);
announcementRouter.put("/:announcementId", isAuthenticated, updateAnnouncement);
announcementRouter.delete(
  "/:announcementId",
  isAuthenticated,
  deleteAnnouncement
);
