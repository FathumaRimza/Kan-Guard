import express from "express";

import protect from "../middleware/authMiddleware.js";

import{

createMissingChild,
getMissingChildren,
updateMissingChild,
deleteMissingChild

}from "../controllers/missingChildController.js";

const router=express.Router();

router.post("/",protect,createMissingChild);

router.get("/",protect,getMissingChildren);

router.put("/:id",protect,updateMissingChild);

router.delete("/:id",protect,deleteMissingChild);

export default router;