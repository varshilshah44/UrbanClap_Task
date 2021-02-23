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
    email:{
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
        pincode:String,
        city:String,
        state:String
    },
    serviceRadius:{
        type:String
    },
    serviceProviderCertificates:[String],
    serviceProviderStatus:{
        type:String,
        default:'active'
    },
    serviceProviderTotalCredits:{
        type:Number,
        default:0
    }, 
    isBusy:Boolean
    
});

const ServiceProvider = mongoose.model('ServiceProvider',serviceProviderSchema);
module.exports = ServiceProvider;

//testing

/*  const obj = {
    serviceProviderName:'varshil',
    serviceProviderMobileNo:'9428712305',
    email:'varshilshah444@gmail.com',
    serviceCategoryId:'602f4ffee8cc7241706ae2e9',
    serviceProviderDocument:{
        documentName:'pan card',
        documentHolderName:'varshil',
        documentNumber:'JQWPS3091J',
        documentImage:'image1'
    },
    serviceProviderPersonalInformation:{
        gender:'male',
        dateOfBirth:new Date(),
        image:'image1'
    },
    serviceProviderCertificates:['cer1','cer2']
}
const createServiceProvider = async () => {
    try{
        await ServiceProvider.create(obj);
        console.log("added");
        }
        catch(err){
            console.log(err.message);
        }
}
createServiceProvider();  */