import mongoose from "mongoose";

const childSchema = new mongoose.Schema(
  {
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    dateOfBirth: {
      type: Date,
      required: true,
    },

    school: {
      type: String,
      required: true,
    },

    grade: {
      type: String,
      required: true,
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    allergies: {
      type: String,
      default: "",
    },

    emergencyContact: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Child", childSchema);