const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Verified User',
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Please enter a proper Email']
    },
    phone: {
        type: Number,
        min: [1000000000, 'Enter 10 digit mobile number'],
        max: [9999999999, 'Enter 10 digit mobile number'],
        unique: true,
        required: [true, 'Mobile Number is necessary']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        // validate: [validator.isStrongPassword, 'Password is not strong'],
        select: false
    },
    role: {
        type: String,
        required: [true, 'Role is required'],
        lowercase: true,
        enum: ['user', 'vendor', 'admin']
    },
    city: {
        type: String,
        required: [true, 'Please enter a City']
    },
    address: {
        type: String,
        required: true
    },
    ucWallet: {
        cash: {
            type: Number,
            default: 0
        },
        history: [String]
    },
    refLink: {
        type: String,
        unique: true,
        default: "https:/testingLink"
    },
    refStatus: {
        type: Boolean,
        default: false,
        validate: {            // NEED TO CHECK FIRST
            validator: function (el) {
                if (el === true) {
                    this.ucWallet.cash += (1 / Math.random()) * 10;
                    this.refStatus = false
                    // el = false;
                    // return el
                }
            }
            // message: "Share referral Code to get discounts"
        }
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    },
    paymentOption: {
        paymentType: {
            type: String,
            enum: ['online', 'upi', 'debitCard', 'creditCard', 'COD'],
            default: 'COD'
        },
        history: [String]
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;