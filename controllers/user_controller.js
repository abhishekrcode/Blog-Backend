
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'; //.env file se koi value nikalni hai tho pehle dotenv ko emport karna padta hai and usko initilize karna padta hai 

import Token from '../models/token.js';

dotenv.config(); //initilize kiya hai yaha par 

export const signupUser = async (request,response) => {
    
    try{ 
        // const user = request.body;
        //ab name fiel mai jo required hai wahi aaye aisa nehi ho ki hume chahiye name or koi number aa jaaye tho uske liye validation karna higa uske liye schema define karna hoga.

        const hashedPassword =await bcrypt.hash(request.body.password, 10);
        

        const user = {username:request.body.username, name:request.body.name, password: hashedPassword}

        
        const newUser = new User(user); //validating 
         await newUser.save(); //esse data base mai save ho jaayega and yeh asyncronous hota hai tho await lagana hai

         return response.status(200).json({msg:'signup successfully'});

    }catch (error) {
           
            return response.status(500).json({msg:'Error while signup the user'});
    }
}


export const loginUser = async (request,response) => {
    let user = await User.findOne({ username: request.body.username}) ;
    if(!user){
     
        return response.status(400).json({msg:"username does not match"});
    }

    try {   
      let match = await bcrypt.compare(request.body.password, user.password);
      if(match){
        //installl npm i jsonwebtoken
        //import jwt from "jsonwebtoken"
        //ab hume yaha token generate karna hai access token and refresh token . so access token jo hota hai wo parmanent nehi hota hai.Eska expiry time hum kuch bhi rakh sakte hai but jo genuin time hota hai wo 15 minutes hota hai.Ab jab accessToken expire ho jaayegatho usse phir se generate kar sakte hai through refreshToken.
        //so eske liye jwt ka use karenge jismai 

        //jwt.sign(body(jo bd se aaya hai),secret key,{expiry time mention kar skte hai});

        const accessToken =jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'});
        const refreshToken =jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);


        const newToken = new Token({ token: refreshToken })// yaha par hume refresh token ko store karna hai esliye sirf refresh token ko pass kr diya and ab isko sidha save karwa sakte ho.
        await newToken.save(); //save function ko call karne par yeh database mai jaakar save ho jaayega.



        //hume ho refresh token hai usko kahin par store karna hoga because when accestoken expire hoga tho uska refresh token chahiye hoga usko fir se generate karne ke liye.so for this hume ek file banani hoki models ke andar token.js ke naam se or usmai ek schema banayenge jisko mongodb mai store karenge. 

        return response.status(200).json({accessToken: accessToken, refreshToken: refreshToken, name: user.name, username:user.username } ); //yaha par aapjo bhi chahte ho bhejna wo bhej sakte ho jaise name ya phir username yeh sab bhi bhej sakte ho.



      }else{
        return response.status(400).json({msg:"password does not match"});
      }

    }catch (error){
        return response.status(500).json({msg:"error while login in user"});
    }

}