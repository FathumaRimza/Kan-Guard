import MissingChild from "../models/missingChildModel.js";

import Notification from "../models/notificationModel.js";

import sendEmail from "../utils/sendEmail.js";
import User from "../models/userModel.js";
export const createMissingChild = async(req,res)=>{

try{

const missing=await MissingChild.create({
...req.body,
reportedBy:req.user._id
});

const policeUsers = await User.find({
role:"Police"
});

for(const police of policeUsers){

await sendEmail(

police.email,

"🚨 Missing Child Alert",

`A new missing child case has been reported.

Please log in to Kan-Guard immediately.`

);

}

res.status(201).json({
success:true,
message:"Missing child reported",
missing
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};

export const getMissingChildren=async(req,res)=>{

try{

const missing=await MissingChild.find()
.populate("child")
.populate("reportedBy","fullName");

res.status(200).json({
success:true,
missing
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};

export const updateMissingChild=async(req,res)=>{

try{

const missing=await MissingChild.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
);

if(missing.status==="Found"){

await Notification.create({

user: missing.reportedBy,

title:"Missing Child Found",

message:
`The missing child report has been updated as Found`

});

}

res.status(200).json({
success:true,
missing
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};

export const deleteMissingChild=async(req,res)=>{

try{

await MissingChild.findByIdAndDelete(req.params.id);

res.status(200).json({
success:true,
message:"Deleted"
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};