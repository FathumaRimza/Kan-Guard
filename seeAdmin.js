import mongoose from "mongoose";
import bcrypt from "bcryptjs";

import User from "./models/userModel.js";


mongoose.connect(
"mongodb://127.0.0.1:27017/childshield"
);



const createAdmin = async()=>{


const hashedPassword =
await bcrypt.hash(
"admin123",
10
);



const admin = await User.create({

fullName:"School Administrator",

email:"admin@childshield.com",

password:hashedPassword,

phone:"0771234567",

role:"SchoolAdmin"

});



console.log("School Admin Created");

process.exit();


};



createAdmin();