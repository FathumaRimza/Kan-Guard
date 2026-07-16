import mongoose from "mongoose";


const anonymousPostSchema = new mongoose.Schema({

problem:{
type:String,
required:true
},


replies:[
{

message:{
type:String,
required:true
},

helpful:{
type:Number,
default:0
},

likedBy:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
],

likedBy:[
{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
}
],
createdAt:{
type:Date,
default:Date.now
}

}
]


},
{
timestamps:true
});


export default mongoose.model(
"AnonymousPost",
anonymousPostSchema
);