import mongoose from "mongoose";

const ApartmentSchema=new mongoose.Schema({
    nameApartment:{
        type:String,
        require:false,
        maxLength:510
    },
    description:{
        type:String,
        require:true,
        maxLength:255
    },
    picture:{
        type:String
    },
    codeCategory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
        // require: true
    },
    //מפתח זר:
    codeCityA:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City',
        require: true
    },
    adress:{
        type:String,
        require:true,

    },
    numBeds:{
        type:Number,
        require:true,
        maxLength:30
    },
    Addadditives:{
        type:String
    },
    price:
    {
        type:Number,
        require:true,
    },
    codeAdvertiser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Advertiser',
        require: true
    }

})
export default mongoose.model('Apartment',ApartmentSchema)
