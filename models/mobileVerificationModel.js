const mongoose = require('../dbconnection');

const mobileVerificationSchema = new mongoose.Schema({
    mobileNo:{
        type:String,
        required:[true,'MobileNo must be required'],
        validate:[/^(\+\d{1,3}[- ]?)?\d{10}$/,'MobileNo is not valid']
    },
    mobileVerificationOtp:{
        type:Number
    },
    mobileVerificationOtpExpire:{
        type:Date,
        default:Date.now() + (30 * 1000)
    },
    userType:{
        type:String,
        enum:['partner','customer']
    }
});

const mobileVerification = mongoose.model('mobileVerification',mobileVerificationSchema);