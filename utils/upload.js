//ab middleware mai kuch kaam  karna hai tho sabse pehle tho jo image hai usko formate karna hai jo image hai wo binary formate mai hai tho uskmai tho kuch kar nehi kar sakte hai tho 2 libraray use karna hoga 1. npm i multer-gridfs-storage or esse ek hume important component milta hai GridFsStorage from multer-gridfs-storage.
//yeh ek function ki tarah treat hota hai and object ko as argument pass karte hai and yeh ek agrument leta hai esmai hume mongodb ka url pass karna hota hai jahan par isko hume upload karna hai.


import {GridFsStorage} from 'multer-gridfs-storage';
import dotenv from 'dotenv';
import multer from 'multer';

dotenv.config();

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// esmai first argument url and 2nd agument options and then 3rd argument file hoti hai yeh 2 argument leta hai req,file emai sabse pehle tho yeh check karna hai ki kaunse type ki immage accept karega 
//file.memeType se file ke naam ka extension check kar sakte hai 

const storage = new GridFsStorage({
    url: `mongodb://${username}:${password}@ac-mp7kghb-shard-00-00.pmojek1.mongodb.net:27017,ac-mp7kghb-shard-00-01.pmojek1.mongodb.net:27017,ac-mp7kghb-shard-00-02.pmojek1.mongodb.net:27017/?ssl=true&replicaSet=atlas-80nmc0-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: {useNewUrlParser:true},
    file: (request,file) => {
        //pehle ek array banaliya hai jis extention ko accept karna hai uske naam ka

        const match = ["image/png", "image/jpg"];

        //agar array mai wo chiz exist karti hai tho other than -1 aayega nehi tho -1 dega
        if(match.indexOf(file.memeType) === -1){
            return `${Date.now()}-blog-${file.originalname}`; //yaha par image name duplicate na ho esliye current date with milisecond ke sath concate kara rahe hai file ke original name ke sath

        }

        //if match ho jata hai matlab jpg ya png mai hai tho 

        return {
            bucketName:"photos",
            filename:`${Date.now()}-blog-${file.originalname}`
        }

        //ab image ko upload karna hai tho uske liye hume use karna hoga multer ka 
        //npm i multer
        //esko as a middleware use karenge yaha par ab import karna hai pehle tho



    }
})

//ap puri jo information hai wo sab storage mai store karwaya hua hai so ab storage ko multer mai pass kar denge.

export default multer({storage}); //esse kya hua apka jo image hai wo mongo db par jaakar upload ho gaya



