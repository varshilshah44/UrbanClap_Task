const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: 'Verified User'
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a proper Email']
    },
    phone: {
        type: Number,
        min: [1000000000, 'Enter 10 digit mobile number'],
        max: [9999999999, 'Enter 10 digit mobile number'],
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
        enum: ['user','vendor','admin']
    },
    city: {
        type: String,
        required: [true, 'Please enter a City']
    },
    ucWallet: {
        type: Number
    },
    refLink: {
        type: String,
        default: "https:/testingLink"
    },
    refStatus:{
        type: Boolean,
        default: false,
        validator: {
            function (el) {
                if(el === true){
                    ucWallet += (1/Math.random())*100;
                    return el = false;
                }
            }
        }
    },
    active: {
        type: Boolean,
        default: true,
        select: false
    }
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;