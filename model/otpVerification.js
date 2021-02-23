const mongoose = require('mongoose');
const validator = require('validator');

// OTP Verification for the logged in user
const otpVerificationSchema = new mongoose.Schema({
    mobileNumber: {
        type: Number,
        // ref: 'User',
        unique: true,
        required: true
    },
    otpValue: {
        type: Number,
        required: true
    },
    otpExpiry: {
        type: Date,
        default: parseInt((Date.now()/1000)%100)+60     //Expires in 60 sec from current time
    }
    /* status: {
        type: Boolean,
        default: false
    } */
})