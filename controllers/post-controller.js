
import  Post from '../models/post.js'



export const createPost = async(request,response) => {
    //yaha par ab api call karni hai
    //verify karni hogi ki jo data frontend se aa raha hai wo correct hai ya nehi usko verify kana hoga uske liye model banana hoga or pura schema define karna hoga.
    //post.js ke naam se ek model banana padega.

    try{

       const post =  await new Post(request.body);
       post.save();
       
       return response.status(200).json('Post saved successfully');

    } catch (error){
        return response.status(500).json(error);
    }

}


export const getAllPosts = async (request,response) => {
    let category = request.query.category;
    let posts;
    try{
        if(category){
            posts = await Post.find({categories: category})
        }else {
            posts = await Post.find({});
        }

        // //yaha par hume sara data utha kar lana hai mongodb ke collection mai se so uske liye hum find() function ka use kar sakte hai suppose hume koi data conditionally nikalna hota hai tho hum find({username:'abhishekmintu'}) aise likhte hai matlab hume sirf wo data chahiye jiska username yeh ho but hume yaha par sara data chahiye tho uske liye hum koi condition nehi likhenge simple find({}) khali chhor denge.
        //     let posts = await Post.find({});

            return response.status(200).json(posts);

    }catch(error){
        return response.status(500).json({msg:error.message})
    }
}

export const getPost = async(request,response) => {
    try {
        const post = await Post.findById(request.params.id);
        return response.status(200).json(post);
    }catch (error){
        return response.status(500).json({msg:error.message})
    }
}

export const updatePost = async (request,response) => {
    try{
        const post = await Post.findById(request.params.id);

        if(!post){
            return response.status(404).json({msg:'post not found'})

        }

        await Post.findByIdAndUpdate(request.params.id,{$set:request.body}) //findByIdAndUpdate 2 argu leta hai 1st jo thota hai wo _id hota hai and 2nd waha use kar sakte hai $set method ka waise 2 method hote hai $set agar kisi array ke andar kisi object ko replace karna hai tho eska use karte hai and if array ke andar object ko append karna hai tho $addToSet ka use karte hai or kis chiz ko replace karna hai wo : double dot likh kar wo likhna hai

        return response.status(200).json({msg:'post updated successfully'})
        
    }
    catch(error) {
        return response.status(500).json({error: error.message})

    }
}

export const deletePost =async (request,response) => {
    try{
        const post = await Post.findByIdAndDelete(request.params.id);

        if(!post){
            return response.status(404).json({msg:'post not found'});
        }

        

        return response.status(200).json({msg:'post deleted successfully'});
    }
    catch (error) {
        return response.status(500).json({error:error.message})
    }
}