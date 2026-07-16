import express from "express";

import {
  createComment,
  getComments,
  getCommentsByReport,
  updateComment,
  deleteComment,
} from "../controllers/commentController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createComment);

router.get("/", protect, getComments);

router.get("/report/:reportId", protect, getCommentsByReport);

router.put("/:id", protect, updateComment);

router.delete("/:id", protect, deleteComment);

export default router;