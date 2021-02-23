const mongoose = require('mongoose');
const validator = require('validator');

// OTP Verification for the logged in user
const otpVerificationSchema = new mongoose.Schema({
    mobileNumber: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    otpValue: {
        type: Number,
        required: true
    },
    otpExpiry: {
        type: Date,
        default: parseInt((Date.now()/1000)%100)
    },
    status: {
        type: Boolean,
        default: false
    }
})