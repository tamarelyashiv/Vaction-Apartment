import mongoose from "mongoose";

const CategorySchema=new mongoose.Schema({
    nameCategory:{
        type:String,
        maxLength:10
    },
    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: "Apartment" // התייחסות למודל Apartment
    }]
});
export default mongoose.model('category',CategorySchema)





