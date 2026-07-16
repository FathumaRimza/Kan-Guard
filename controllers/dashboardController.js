import User from "../models/userModel.js";
import Child from "../models/childModel.js";
import Report from "../models/reportModel.js";
import Alert from "../models/alertModel.js";
import MissingChild from "../models/missingChildModel.js";
import Notification from "../models/notificationModel.js";


export const getDashboard = async (req,res)=>{

    try{

        const totalUsers = await User.countDocuments();

        const totalChildren = await Child.countDocuments();

        const totalReports = await Report.countDocuments();

        const pendingReports = await Report.countDocuments({
            status:"Pending"
        });

        const totalAlerts = await Alert.countDocuments();

        const missingChildren = await MissingChild.countDocuments({
            status:"Missing"
        });

        const unreadNotifications = await Notification.countDocuments({
            user:req.user._id,
            isRead:false
        });
        const recentReports = await Report.find()
.sort({ createdAt: -1 })
.limit(5)
.select("title category status createdAt");


        res.status(200).json({

            success:true,
dashboard:{
    totalUsers,
    totalChildren,
    totalReports,
    pendingReports,
    totalAlerts,
    missingChildren,
    unreadNotifications,
    recentReports
}

        });


    }catch(error){

    console.log(error);

    res.status(500).json({
        success:false,
        message:error.message
    });

}
};