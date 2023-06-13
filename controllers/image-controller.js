
import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const url = process.env.BASE_URL; 

let gfs,gridfsBucket; //ek global varible liya hai 
const conn = mongoose.connection;
//conn.once check karega ki mongodb se connection open matlab established hai agar hai tho tho yeh ek call back funtion deta hai umai hum gridfs ka sath kaam kar skte hai.
conn.once('open', () =>{
    //first argument kaun sa database se lena hai 
    //2nd argument ek object leta hai
    gridfsBucket =new mongoose.mongo.GridFSBucket(conn.db,{
        bucketName:'fs' //fs collection ka naam hai so hume fs par streaming karni hai
    }); 
    gfs = grid(conn.db,mongoose.mongo);
   
    gfs.collection('fs'); //kaha se value uthana hai
    //ab image jo get karna hai uske liye getImage funtion ke andar likhna hoga
})

export const uploadImage = (request,response) => {
    if(!request.file){
        return response.status(404).json({msg:"File not found"});
    }
    //backend humara kaha par chal raha hai wo url chahiye hoga

    const imageUrl = `${url}/file/${request.file.filename}`;

    return response.status(200).json(imageUrl);
}

export const getImage = async (request,response) => {
    //ab ek chiz notice karo ki jo file hai wo chunks ke form mai hai(stream ke form hai) tho uske liye hume ek library use karna hoga
    //npm i gridfs-stream --force
    
    try {
        const file = await gfs.files.findOne({filename: request.params.filename}); //filename se he kyo uthaya hai kyoki route.js mai path mai param mai filename he varible ka naam likha hua hai
        const readStream = gridfsBucket.openDownloadStream(file._id); //yeh ek chunks or stream ko return karta hai ab esko ek pipe ke through pass karana hota hai taaki esko readable form mai convert kar sake.
        readStream.pipe(response);

    } catch(error){
        return response.status(500).json({ msg: error.message })

    }

}