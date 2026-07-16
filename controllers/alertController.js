import Alert from "../models/alertModel.js";

import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";

// Create Alert
export const createAlert = async(req,res)=>{

try{


const alert = await Alert.create({

...req.body,

createdBy:req.user._id

});

const parentsUser = await User.find({
role:"Parent"
});

for(const parent of parents){

await sendEmail(

parent.email,

"📢 New Community Alert",

`${alert.title}

${alert.message}

Location: ${alert.location}`

);

}


// Get all parents

const parents = await User.find({
role:"Parent"
});


// Send notification to every parent

const notifications = parents.map((parent)=>({

user:parent._id,

title:"New Safety Alert 🚨",

message:
`${alert.title} - ${alert.location}`,

type:"Alert"

}));


await Notification.insertMany(notifications);



res.status(201).json({

success:true,

message:"Alert created and notifications sent",

alert

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};

// Get Alerts
export const getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find().populate(
      "createdBy",
      "fullName role"
    );

    res.status(200).json({
      success: true,
      alerts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Alert
export const updateAlert = async (req, res) => {
  try {
    const alert = await Alert.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      alert,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Alert
export const deleteAlert = async (req, res) => {
  try {
    await Alert.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Alert deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};