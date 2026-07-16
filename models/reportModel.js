import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    child: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Child",
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Suspicious Person",
        "Bullying",
        "Child Abuse",
        "CyberBullying",
        "Kidnapping Attempt",
        "Unsafe Road",
        "Drug Activity",
        "Harassment",
        "Fighting",
        "Theft",
        "Medical Emergency",
        "Vandalism",
        "Emotional Distress",
        "Other",
      ],
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    incidentDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Community Verified",
        "School Verified",
        "Investigating",
        "Solved By Parent", 
        "Resolved",
      ],
      default: "Pending",
    },

    evidence: {
      type: String,
      default: "",
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Report", reportSchema);