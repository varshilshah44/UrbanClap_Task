const mongoose = require('../dbconnection');
const ServiceCategory = require('./ServiceCategoryModel');

const ServicesSchema = new mongoose.Schema({
    serviceName:{
        type:String,
        required:[true,'ServiceName must required'],
        validate:[/^[a-zA-Z\s]+$/,'ServiceName only contains alphabets and spaces']
    },
    ServiceCategoryId:{
        type:mongoose.Schema.ObjectId,
        ref:'ServiceCategory'
    },
    workType:[{
        name:{
            type:String,
            required:[true,'WorkTypeName must be required'],
            unique:true,
            validate:validateObj
        },
        price:{
            type:Number,
            required:[true,'price must be required'],
        },
        image:{
            type:String
        },
        description:{
            type:String
        }
    }]
});

const Service = mongoose.model('Service',ServicesSchema);
module.exports = Service;

//testing

/* const serviceObj = {
    serviceName:'abc',
    ServiceCategoryId:'602f4ffee8cc7241706ae2e9',
    workType:{
        name:'abcc',
        price:100,
        image:'image1',
        description:'this is description'
    }
}

const createServices = async () => {
    try{
    const service = await Service.create(serviceObj);
    console.log("added");
    }
    catch(err){
        console.log(err.message);
    }
}

createServices(); */