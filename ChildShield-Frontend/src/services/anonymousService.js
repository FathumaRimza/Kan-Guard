import API from "../api/axios";


// Create anonymous problem
export const createAnonymousPost = async(data)=>{

const response =
await API.post(
"/anonymous",
data
);

return response.data;

};




// Get all anonymous posts
export const getAnonymousPosts = async()=>{

const response =
await API.get(
"/anonymous"
);

return response.data;

};




// Add reply
export const addAnonymousReply = async(id,data)=>{

const response =
await API.post(
`/anonymous/${id}/reply`,
data
);

return response.data;

};


export const likeReply = async(postId, replyId)=>{

const response = await API.put(
`/anonymous/${postId}/reply/${replyId}/like`
);

return response.data;

};