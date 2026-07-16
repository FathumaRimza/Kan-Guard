import Report from "../models/reportModel.js";
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";
import sendEmail from "../utils/sendEmail.js";

// Create Report
export const createReport = async (req, res) => {
  try {

    const report = await Report.create({
      ...req.body,
      reportedBy: req.user._id,
    });

   const admins = await User.find({
  role:{
    $in:[
      "SchoolAdmin",
      "Police"
    ]
  }
});


for (const admin of admins) {

  // Save notification
  await Notification.create({
    user: admin._id,
    title: "New Safety Report 🚨",
    message: `A new ${report.category} report has been submitted`,
  });

  // Send email
  await sendEmail(
    admin.email,
    "🚨 New Child Safety Report",
    `Hello ${admin.fullName},

A new child safety report has been submitted.

Category: ${report.category}

Description:
${report.description}

Please log in to Kan-Guard to review the report.

Thank you,
Kan-Guard Team`
  );

}
    res.status(201).json({
      success: true,
      message: "Report submitted successfully",
      report,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get All Reports
export const getReports = async (req, res) => {
  try {

    const reports = await Report.find()
      .populate("reportedBy", "fullName email role")
      .populate("child", "fullName school");

    res.status(200).json({
      success: true,
      count: reports.length,
      reports,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Single Report
export const getReport = async (req, res) => {
  try {

    const report = await Report.findById(req.params.id)
      .populate("reportedBy", "fullName email")
      .populate("child");

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      report,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Report
export const updateReport = async (req, res) => {
  try {

    const report = await Report.findById(req.params.id);


    

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Save old status
    const oldStatus = report.status;

    // Update report
    report.title = req.body.title || report.title;
    report.category = req.body.category || report.category;
    report.description = req.body.description || report.description;
    report.location = req.body.location || report.location;
    report.incidentDate = req.body.incidentDate || report.incidentDate;
    report.status = req.body.status || report.status;
    

    await report.save();

    // Create notification only if status changed
    if (oldStatus !== report.status) {

      await Notification.create({

        user: report.reportedBy,

        title: "Report Status Updated",

        message: `Your report "${report.title}" status changed to "${report.status}".`

      });

    }

    res.status(200).json({
      success: true,
      message: "Report updated successfully",
      report,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Report
export const deleteReport = async (req, res) => {
  try {

    const report = await Report.findByIdAndDelete(req.params.id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Report deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};