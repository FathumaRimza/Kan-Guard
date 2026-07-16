import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js"; // IMPORT: Needed to lookup user email addresses
import nodemailer from "nodemailer";

// Setup the nodemailer email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Helper function to send email notifications
const sendNotificationEmail = async (toEmail, title, message) => {
  try {
    const mailOptions = {
      from: `"Kan-Guard System" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: `🔔 Kan-Guard Alert: ${title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; border: 1px solid #D6AF5C; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          <div style="background-color: #4E8F90; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 22px;">Kan-Guard Notification</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9; font-size: 14px;">Safe Childhood • Stronger Tomorrow</p>
          </div>
          <div style="padding: 25px; background-color: #F8FAF8; color: #334155;">
            <h3 style="color: #4E8F90; margin-top: 0; font-size: 18px; font-weight: bold;">${title}</h3>
            <p style="line-height: 1.6; font-size: 15px; color: #475569;">${message}</p>
            <hr style="border: 0; border-top: 1px solid #D6AF5C; margin: 25px 0;" />
            <p style="font-size: 11px; color: #6B7280; text-align: center; margin-bottom: 0;">
              This is an automated security alert from your Kan-Guard Dashboard. Please do not reply directly to this email.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Notification email successfully sent to: ${toEmail}`);
  } catch (error) {
    console.error("❌ Error sending notification email:", error.message);
  }
};

// Create Notification (Saves to DB AND Sends Email)
export const createNotification = async (req, res) => {
  try {
    // 1. Create and save the notification in the database for the React UI
    const notification = await Notification.create(req.body);

    // 2. Safely check if a target user ID is provided in the request body
    // (Adjust 'req.body.user' to match whatever property name your model uses for the user reference)
    const targetUserId = req.body.user;

    if (targetUserId) {
      // Find the user profile to capture their registered email address
      const foundUser = await User.findById(targetUserId);
      
      if (foundUser && foundUser.email) {
        // 3. Fire-and-forget the email delivery asynchronously so it doesn't slow down the API response
        sendNotificationEmail(foundUser.email, notification.title, notification.message);
      }
    }

    res.status(201).json({
      success: true,
      message: "Notification created and email dispatched successfully",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Notification
export const getNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Mark Notification as Read
export const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    notification.isRead = true;
    await notification.save();

    res.status(200).json({
      success: true,
      message: "Notification marked as read",
      notification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};