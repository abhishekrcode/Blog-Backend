

import express from 'express';

import { signupUser, loginUser } from '../controllers/user_controller.js';
import { uploadImage, getImage} from '../controllers/image-controller.js';
import {createPost,getAllPosts,getPost,updatePost,deletePost} from '../controllers/post-controller.js'
import {authenticateToken} from '../controllers/jwt-controller.js'
import { newComment ,getComments,deleteComment} from '../controllers/comment-controller.js';

import upload from '../utils/upload.js'

const router = express.Router();

router.post('/signup',signupUser);
router.post('/signIn',loginUser);


router.post('/file/upload', upload.single('file'),uploadImage); // eska 1st argument route hota hai ,2nd argument middleware hota hai and 3rd argument eska api ka funtion hota hai. so middle middleware bannana hoga so uske liye server ke andar ek folder banana hoga utils ke naam se usmai file banani hai upload.js ke naam se or upload.js ke andar jo bhi kuch nikalenge or rakhenge wo sab middle ware ki tarah use karoge.
//ab hume jo mongodb mai save hua pic ka jo url mila hai usko show karana hai tho uske liye hume ek route banana hoga get karne ke liye
router.get('/file/:filename',getImage);


router.post('/create',authenticateToken,createPost); //ab tho pehle authenticate karna padega ki jo access token bhej rahe ho wo valid hai ya nehi ya exist karta hai ya nehi
router.get('/posts' ,authenticateToken, getAllPosts);
router.get('/post/:id',authenticateToken,getPost);
router.put('/update/:id',authenticateToken, updatePost);
router.delete('/delete/:id',authenticateToken, deletePost)

router.post('/comment/new',authenticateToken,newComment);
router.get('/comments/:id',authenticateToken, getComments)
router.delete('/comment/delete/:id',authenticateToken,deleteComment)




export default router;