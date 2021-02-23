const mongoose = require('mongoose');
const validator = require('validator');
const mobVerificationSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: [true, 'Please enter your Mobile Number to verify'],
        validate:{
            validator:function(value){
            return value.match(/^(\+\d{1,3}[- ]?)?\d{10}$/);
            },
            message:'Enter valid Mobile Number'
            }
    },
    generatedOTP: {
        type: Number
    },
    OTPExpiresIn: {
        type: Date.now() + 10 * 60 * 1000
    }
})

const MobVerification = mongoose.model('MobVerification', mobVerificationSchema);
module.exports = MobVerification;