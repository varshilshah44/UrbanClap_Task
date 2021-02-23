const mongoose = require('mongoose');
const validator = require('validator');

const vendorSchema = new mongoose.Schema({
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
    profession: [{
        mainService: {
            type: mongoose.Types.ObjectId,
            ref: 'Service'
        }
    }],
    documents: {
        adharCard: {
            type: String,
            validate: {
                function(v) {
                    // let reg = /^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/
                    return /^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/.test(v); 
                }               
            }
        },
        panCard: {
            type: String,
            validate: {
                function(v) {
                    // let reg = /^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/
                    return /[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(v);  
                }
            }
        }
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
    createdAt: Date,
    status: {
        type: String,
        enum: ['Available','Busy','Not Available']
    }
})

const vendor = mongoose.model('Vendor', vendorSchema);

module.exports = vendor;