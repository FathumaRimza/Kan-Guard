import express from "express";

import {
  createReport,
  getReports,
  getReport,
  updateReport,
  deleteReport,
} from "../controllers/reportController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

// Parent, Teacher & Volunteer can create reports
router.post(
  "/",
  protect,
  createReport
);

// Everyone can view reports
router.get("/", protect, getReports);

router.get("/:id", protect, getReport);

// Only Police and School Admin can update report status
router.put(
  "/:id",
  protect,
  authorize("Police", "SchoolAdmin"),
  updateReport
);

// Only School Admin can delete reports
router.delete(
  "/:id",
  protect,
  authorize("SchoolAdmin"),
  deleteReport
);

export default router;