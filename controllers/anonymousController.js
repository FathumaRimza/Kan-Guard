import AnonymousPost from "../models/anonymousPostModel.js";


// Create Anonymous Post
export const createAnonymousPost = async(req,res)=>{

try{

const post = await AnonymousPost.create({

problem:req.body.problem

});


res.status(201).json({

success:true,

message:"Anonymous post created successfully",

post

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}

};





// Get All Anonymous Posts
export const getAnonymousPosts = async(req,res)=>{


try{


const posts = await AnonymousPost.find()
.populate("replies.likedBy","_id")
.sort({
createdAt:-1
});


res.status(200).json({

success:true,

posts

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};







// Add Reply

export const addAnonymousReply = async(req,res)=>{


try{


const post =
await AnonymousPost.findById(req.params.id);



if(!post){

return res.status(404).json({

success:false,

message:"Post not found"

});

}



post.replies.push({

message:req.body.message

});



await post.save();



res.status(200).json({

success:true,

message:"Reply added successfully",

post

});


}
catch(error){

res.status(500).json({

success:false,

message:error.message

});

}


};

// Like Reply
export const likeReply = async(req,res)=>{

try{

const post =
await AnonymousPost.findById(req.params.id);


if(!post){

return res.status(404).json({
message:"Post not found"
});

}


const reply =
post.replies.id(req.params.replyId);



if(!reply){

return res.status(404).json({
message:"Reply not found"
});

}



const userId=req.user._id;



if(reply.likedBy.includes(userId)){


reply.likedBy =
reply.likedBy.filter(
(id)=>id.toString() !== userId.toString()
);


reply.helpful -=1;


}
else{


reply.likedBy.push(userId);

reply.helpful +=1;


}



await post.save();



res.json({

success:true,

reply

});


}
catch(error){

res.status(500).json({

message:error.message

});

}


};