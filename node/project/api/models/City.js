import mongoose from "mongoose";

const CitySchema=new mongoose.Schema({
    nameCity:{
        type:String,
        require:true,
        maxLength:10
    },
    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: "Apartment" // התייחסות למודל Apartment
    }]
});
export default mongoose.model('City',CitySchema)
