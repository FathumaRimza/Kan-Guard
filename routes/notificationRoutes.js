import express from "express";

import {
  createNotification,
  getNotifications,
  getNotification,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNotification);

router.get("/", protect, getNotifications);

router.get("/:id", protect, getNotification);

router.put("/:id/read", protect, markAsRead);

router.delete("/:id", protect, deleteNotification);

export default router;