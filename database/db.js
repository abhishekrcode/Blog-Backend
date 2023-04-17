//yeh jo Connection function hoga wo database se jaakarr connection banayega
//ab database (Cloud MongoDb) ek external entity hai tho hume yaha try and catch lagana padega. or esse lagakar mujhe eski external handling karni padegi.
//so databse se connection banane ke liye hum dorect express ka use mnehi kar sakte hai tho uske liye 2 library hoti hai ek mongo db and 2nd hoti hai mongoose tho hum yah mongooose use karenge so uko use karne ke liye pehle usko install karnege---> npm i mongoose 

//ab esko es db.js mai import karna hai and then eske funtion ko use karke connection banana hai.

//mongoose.connect 2 agruments leta hai 1st is URL and 2nd is one Object jismai kuch chie pass karte hai or yaha par hum sirf ek he chiz pass karenge {useNewParser:true} eska matlab hai ki hum mongodb ko keh rahe hai ki purane wala parser deplicate ho gaya hai or naya wala parser jo hai usko use karna hai.
//Mongoose.connect jo function hota hai wo ek asynchronous function hota hai tho  hume await  and async funtion banana padega.

//connect ka url ke liye ab kya karna hai ki cloud.mongodb ke page par connect ka ek otion hoga uspar click karna hai then "connect to your application par click karna hai" and select varsion mai 2.2.12 or later wala select karlena hai then usi ke l=niche url diya hoga usko copy kar lena hai and then usko close kar dena hai.
//ab url ko Const URL mai paste karna hai and password jaha likha hai url mai waha jo password likha tha wo dalana hai.

//yaha par password mai agar special character use kiya gaya hai tho uske liye alag se code use karna hota hai wo cloud.mongodb par se dekh lena and ek or cheez useNewParser nehi useNewUrlParser hota hai(remember).

//yaha par ek drawback hai ki hum apne sensititve chize kabhi bhi code mai nehi likhte hai jaise ki username and password so esko thik karne ke liye hum ek package install karenge ---> npm i dotenv and remember ki dotemv ko kabhi bhi hum push nehi karte git ya github par. and esko production mai bhi push nehi kiya jata hai.so yeh safe hota hai .

//so npm i dotenv karne ke baad ek file banaeyge .env karke server folder mai then usmai simple DB_USERNAME=abhishekmintu and DB_PASSWORD=J%40rutnim5 likhenge and then index.js mai esko import karke dotenv.config() and then second last line mai const USERNAME =process.env.DB_USERNAME; and const PASSWORD =process.env.DB_PASSWORD; lekhenge and then Connection ke call mai USERNAME AND PASSWORD as argument bhej denge and the db mau username and password as argument recieve karke usko url mai dynamically daal denge.

//ab eske baad hume API banani hai so uske liye hum ek folder banayenge routes and usmai 1 file banayenge route.js ab route kya hota hai route api ka endpoint hota hai.suppose www.facebook.com/user --> so facebook.com yeh API url hai and /user apka endpoint hai.api url humesha same rehta hai bus end point humesha change hota hai.

import mongoose from "mongoose"

 const Connection = async(username, password) => {
    
    const URL=`mongodb://${username}:${password}@ac-mp7kghb-shard-00-00.pmojek1.mongodb.net:27017,ac-mp7kghb-shard-00-01.pmojek1.mongodb.net:27017,ac-mp7kghb-shard-00-02.pmojek1.mongodb.net:27017/?ssl=true&replicaSet=atlas-80nmc0-shard-0&authSource=admin&retryWrites=true&w=majority`; 

    try {
       await mongoose.connect(URL,{useNewUrlParser:true});
       console.log("Database Connected Successfully")
    } catch (error){
        console.log("Error while connecting with the database",error);

    }
}

export default Connection;