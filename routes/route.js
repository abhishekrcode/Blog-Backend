

import express from 'express';

import { signupUser, loginUser } from '../controllers/user_controller.js';
import { uploadImage, getImage} from '../controllers/image-controller.js';

import upload from '../utils/upload.js'

const router = express.Router();

router.post('/signup',signupUser);
router.post('/signIn',loginUser);


router.post('/file/upload', upload.single('file'),uploadImage); // eska 1st argument route hota hai ,2nd argument middleware hota hai and 3rd argument eska api ka funtion hota hai. so middle middleware bannana hoga so uske liye server ke andar ek folder banana hoga utils ke naam se usmai file banani hai upload.js ke naam se or upload.js ke andar jo bhi kuch nikalenge or rakhenge wo sab middle ware ki tarah use karoge.

//ab hume jo mongodb mai save hua pic ka jo url mila hai usko show karana hai tho uske liye hume ek route banana hoga get karne ke liye

router.get('/file/:filename',getImage);



export default router;