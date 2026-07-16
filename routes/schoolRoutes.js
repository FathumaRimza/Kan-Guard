import express from "express";

import {
  createSchool,
  getSchools,
  getSchool,
  updateSchool,
  deleteSchool,
} from "../controllers/schoolController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

// Only School Admin can create/update/delete schools
router.post("/", protect, authorize("SchoolAdmin"), createSchool);

router.get("/", protect, getSchools);

router.get("/:id", protect, getSchool);

router.put("/:id", protect, authorize("SchoolAdmin"), updateSchool);

router.delete("/:id", protect, authorize("SchoolAdmin"), deleteSchool);

export default router;