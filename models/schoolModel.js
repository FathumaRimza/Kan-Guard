import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema(
{
    schoolName:{
        type:String,
        required:true
    },

    address:{
        type:String,
        required:true
    },

    district:{
        type:String,
        required:true
    },

    principal:{
        type:String,
        required:true
    },

    contactNumber:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true
    }
},
{
timestamps:true
}
);

export default mongoose.model("School",schoolSchema);