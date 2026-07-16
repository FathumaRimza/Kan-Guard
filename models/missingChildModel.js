import mongoose from "mongoose";

const missingChildSchema = new mongoose.Schema(
{
    child:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Child",
        required:true
    },

    reportedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    lastSeenLocation:{
        type:String,
        required:true
    },

    lastSeenDate:{
        type:Date,
        required:true
    },

    clothes:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:["Missing","Found"],
        default:"Missing"
    }

},
{
timestamps:true
}
);

export default mongoose.model("MissingChild",missingChildSchema);