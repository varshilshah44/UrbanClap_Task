const mongoose = require('../dbconnection');
const validator = require('validator');
const ServiceCategory = require('./ServiceCategoryModel');

const serviceProviderSchema = new mongoose.Schema({
    serviceProviderName:{
        type:String,
        required:[true,'serviceProviderName be required'],
        validate:[/^[a-zA-Z\s]+$/,'serviceProviderName only contains alphabets and spaces']
    },
    serviceProviderMobileNo:{
        type:String,
        required:[true,'serviceProviderMobileNo be required'],
        unique:true,
        validate:[/^(\+\d{1,3}[- ]?)?\d{10}$/,'MobileNo is not valid']
    },
    serviceProviderEmail:{
        type:String,
        validate:[validator.isEmail,'Email is not valid'],
        unique:true     
    },
    serviceCategoryId:{
        type:mongoose.Schema.ObjectId,
        ref:'ServiceCategory'
    },
    serviceProviderDocument:{
        documentName:{
            type:String 
        },
        documentHolderName:{
            type:String,
            validate:[/^[a-zA-Z\s]+$/,'documentHolderName only contains alphabets and spaces'],
            required:[true,'documentHolderName is required']
        },
        documentNumber:{
            type:String,
            validate:{
                validator:function(val){
                    if(this.serviceProviderDocument.documentName.toLowerCase() === "pan card"){
                        return val.match(/[A-Z]{5}[0-9]{4}[A-Z]{1}/);    
                    }
                    else if(this.documentName.toLowerCase() === "aadhar card"){
                        return val.match(/^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/);    
                    }
                    else{
                        return false;
                    }
                    
                },
                message:'documentNumber is not valid'
            },
            unique:true,
            required:[true,'documentNumber is required']
        },
        documentImage:{
            type:String,
            required:[true,'documentImage is required']
        }
    },
    serviceProviderPersonalInformation:{
           gender:{
               type:String,
               enum:{
                   values:['male','female'],
                   message:'gender must be either male or female'
               }    
           },
           dateOfBirth:{
               type:Date
           },
           image:{
               type:String
           } 
    },
    serviceProviderAddress:{
        flatNo:String,
        street:String,
        pincode:Number,
        city:String,
        state:String
    },
    serviceRadius:{
        type:String
    },
    serviceProviderCertificates:[String],
    isActive:{
        type:Boolean,
        default:true
    },
    serviceProviderTotalCredits:{
        type:Number,
        default:0
    }
    
});

const ServiceProvider = mongoose.model('ServiceProvider',serviceProviderSchema);
module.exports = ServiceProvider;
