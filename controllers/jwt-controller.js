
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();



export const authenticateToken = (request,response,next) => {
    const authHeader = request.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null) {
        return response.status(401).json({msg:"token is missing"});
    }
    
    //jwt ko use karne ke liye pehle usko iport kar lenge then jwt mai ek funtion hoti hai verify usko use karenge uske argument mai 1st hota hai actual token ,2nd mai leta hai apka .env file ke andar jo access_secret_key dala hua hai wo tho uske liye dotenv ko iport karna hoga or intilize karke uski value nikal ni hogi process.env.ACCESS_SECRET_KEY karke and 3rd argument jo hai wo ek call back function hota hai agar verify hota hai tho matlab success hai tho thik hai nehi tho error dega nehi tho sucess hai tho user dega.
    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if(error){
            return response.status(403).json({msg:'invalid token'})
        }

        request.user = user; //agar error nehi hai tho request ke andar user ko pass kar sakte hai joki yaha par user ki information hai.

        next(); //next function ko call marne se yeh api call mai jo next argument hai uspar chale jaayega matlab wo call ho jaayega.
    })
}