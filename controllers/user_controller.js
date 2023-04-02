
import User from '../models/user.js';

export const signupUser = async (request,response) => {
    try{
        const user = request.body;
        //ab name fiel mai jo required hai wahi aaye aisa nehi ho ki hume chahiye name or koi number aa jaaye tho uske liye validation karna higa uske liye schema define karna hoga.

        const newUser = new User(user); //validating 
         await newUser.save(); //esse data base mai save ho jaayega and yeh asyncronous hota hai tho await lagana hai

         return response.status(200).json({msg:'signuo successful'})

    }catch(error){
            return response.status(500).jsin({msg:'Error whilw signup the user'})
    }
}