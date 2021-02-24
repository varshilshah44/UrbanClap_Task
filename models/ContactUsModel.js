const mongoose = require('../dbconnection');
const validator = require('validator');
const ContactUsSchema = new mongoose.Schema({
    officeName:{
        type:String,
        required:[true,'officeName is required']
    },
    address:{
        type:String,
        required:[true,'address is required']
    },
    city:{
        type:String,
        required:[true,'city is required']
    },
    pincode:{
        type:String,
        required:[true,'pincode is required'],
        validate:{
            validator:function(val){
                return val.match(/^[1-9][0-9]{5}$/);
            },
            message:'pincode is not valid'
        }
    }

});

const ContactUs = mongoose.model('ContactUs',ContactUsSchema);
