import mongoose from "mongoose";

const AdvertiserSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
        
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
   password:{
        type:String,
        require:true,
        minLength:3,
        maxLength:255
    },
    phone:{
        type:String,
        require:true,
        maxLength:10
    },
    morePhone:{
        type:String,
        require:false,
        maxLength:10
    },
    //מערך
    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: "Apartment" // התייחסות למודל Apartment
    }]
});
export default mongoose.model('Advertiser',AdvertiserSchema)
