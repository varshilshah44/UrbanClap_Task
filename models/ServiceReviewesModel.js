const mongoose = require('../dbconnection');
const ServiceProvider = require('./ServiceProviderModel');
const Service = require('./ServicesModel');
const ServiceReviewsSchema = new mongoose.Schema({
    reviewerName:{
        type:String,
        default:'I am Bhoot'
    },
    message:{
        type:String
    },
    rating:{
        type:Number,
        min:[1,'rating is >= 1'],
        max:[5,'rating is <= 5']
    },
    serviceId:{
        type:mongoose.Schema.ObjectId,
        ref:'Service'
    },
    workTypeName:{
        type:String
    },
    serviceProviderId:{
        type:mongoose.Schema.ObjectId,
        ref:'ServiceProvider' 
    }
});

const ServiceReview = mongoose.model('ServiceReview',ServiceReviewsSchema);


//testing

/* const obj = {
    message:'nice service',
    rating:1.5,
    serviceId:'602f6580229b675088f1aa66',
    workTypeName:'abcc',
    serviceProviderId:'602f883fad1b0e24e8cd1fff'

}

const createReview = async () => {
    try{
    await ServiceReview.create(obj);
    console.log("added")
    }
    catch(err){
        console.log(err.message);
    }    
}

const getReview = async () => {
    try{
       const reviews =  await ServiceReview.find().populate({path:'serviceProviderId serviceId',select:'-workType -serviceProviderPersonalInformation -serviceProviderDocument -serviceProviderCertificates -serviceCategoryId'})
       for(let i of reviews){
           console.log(i.serviceProviderId);
           console.log(i.serviceId)
       }
    }
    catch(err){
        console.log(err.message)
    }
}

createReview();
getReview(); */