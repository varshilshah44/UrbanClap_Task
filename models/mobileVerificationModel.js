const mongoose = require('../dbconnection');
const bcrypt = require('bcryptjs');

const mobileVerificationSchema = new mongoose.Schema({
    mobileNo:{
        type:String,
        required:[true,'MobileNo must be required'],
        validate:[/^(\+\d{1,3}[- ]?)?\d{10}$/,'MobileNo is not valid']
    },
    mobileVerificationOtp:{
        type:String
    },
    mobileVerificationOtpExpire:{
        type:Date,
    },
    userType:{
        type:String,
        enum:{
            values:['partner','customer'],
            message:'userType must be between partner or customer'
        }
    }
});

mobileVerificationSchema.pre('save',async function(next){
    if(this.mobileVerificationOtp){
    this.mobileVerificationOtp = await bcrypt.hash(this.mobileVerificationOtp,12);
    next();
    }
})

mobileVerificationSchema.methods.compareOtp = async function(userOtp,storedOtp){
      return await bcrypt.compare(userOtp,storedOtp)
}

const mobileVerification = mongoose.model('mobileVerification',mobileVerificationSchema);
module.exports = mobileVerification;