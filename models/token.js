import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    token:{
        type: String,
        required: true
    }
})

//const token => ab ek collection bannani hai tho suppose yaha likha token and then mongoose ke help se model ko call kar sakte hai then uske 1st argument collection name pass kar sakte ho and then 2nd argument mai es collection mai kaun sa schema impliment hoga wo daal skte ho.

const token = mongoose.model('token',tokenSchema);

export default token;

