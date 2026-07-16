import express from "express";

import {
  createAlert,
  getAlerts,
  updateAlert,
  deleteAlert,
} from "../controllers/alertController.js";

import protect from "../middleware/authMiddleware.js";
import authorize from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  authorize("Police", "SchoolAdmin"),
  createAlert
);

router.get("/", protect, getAlerts);

router.put(
  "/:id",
  protect,
  authorize("Police", "SchoolAdmin"),
  updateAlert
);

router.delete(
  "/:id",
  protect,
  authorize("SchoolAdmin"),
  deleteAlert
);

export default router;