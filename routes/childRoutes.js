import express from "express";

import {
  addChild,
  getChildren,
  getChild,
  updateChild,
  deleteChild,
} from "../controllers/childController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addChild);

router.get("/", protect, getChildren);

router.get("/:id", protect, getChild);

router.put("/:id", protect, updateChild);

router.delete("/:id", protect, deleteChild);

export default router;