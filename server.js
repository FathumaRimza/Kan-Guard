import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import { connect } from "mongoose";
import authRoutes from "./routes/authRoutes.js";
import childRoutes from "./routes/childRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";

import alertRoutes from "./routes/alertRoutes.js";
import missingChildRoutes from "./routes/missingChildRoutes.js";

import schoolRoutes from "./routes/schoolRoutes.js";

import commentRoutes from "./routes/commentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import anonymousRoutes from "./routes/anonymousRoutes.js";

dotenv.config();
const app=express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/children", childRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/missing",missingChildRoutes);
app.use("/api/schools", schoolRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard",dashboardRoutes);
app.use(
"/api/anonymous",
anonymousRoutes
);


connectDB();

app.get("/",(req,res)=>{
res.send("ChildShield API is Running");
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
console.log(`Server is running on port ${PORT}`);
});