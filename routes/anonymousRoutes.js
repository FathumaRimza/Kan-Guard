import express from "express";
import protect from "../middleware/authMiddleware.js";


import {

createAnonymousPost,
getAnonymousPosts,
addAnonymousReply,
likeReply

}
from "../controllers/anonymousController.js";



const router = express.Router();



// create problem

router.post(
"/",
createAnonymousPost
);



// view problems

router.get(
"/",
getAnonymousPosts
);



// add advice

router.post(
"/:id/reply",
addAnonymousReply
);

router.put(
"/:id/reply/:replyId/like",
protect,
likeReply
);


export default router;