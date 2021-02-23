const mongoose = require('mongoose');
const validator = require('validator');

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Must have a Name'],
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please enter a proper Email']
    },
    phone: {
        type: Number,
        min: [1000000000, 'Enter 10 digit mobile number'],
        max: [9999999999, 'Enter 10 digit mobile number'],
        unique: true,
        required: [true, 'Mobile Number is necessary']
    },
    image: {
        type: String,       // Can also use buffer
        required: [true, 'Photo is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        // validate: [validator.isStrongPassword, 'Password is not strong'],
        select: false
    },
    profession: [
        {
            mainService: {
                type: mongoose.Types.ObjectId,
                ref: 'Service'
            }
        }
    ],
    documents: {
        adharCard: {
            type: String,
            validate: {
                validator: function (v) {
                    // let reg = /^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/
                    return /^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/.test(v);
                },
                message: "Invalid document"
            }
        },
        panCard: {
            type: String,
            validate: {
                validator: function (v) {
                    // let reg = /^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/
                    return /[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(v);
                },
                message: "Invalid document"
            }
        }
    },
    // role: {
    //     type: String,
    //     required: [true, 'Role is required'],
    //     enum: ['user', 'vendor', 'admin']
    // },
    credits: {
        type: Number,
        default: 0
    },
    city: {
        type: String,
        required: [true, 'Please enter a City']
    },
    createdAt: Date,
    status: {
        type: String,
        enum: ['Available', 'Busy', 'Not Available']
    },
    // rating: {           // Can also take from the review collection
    //     type: Number,
    //     required: true,
    //     validate: {
    //         validator: function (el) {
    //             return el >= 4.2
    //         },
    //         message: "Please keep your rating above 4.2"
    //     }
    // },
    /* paymentHistory: {
        paymentDate: {
            type: Date
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Finished']
        },
        value: {
            type: Number
        }
    }, */
    jobHistory: {
        type: mongoose.Types.ObjectId,
        ref:'Leads'
    }
})

const vendor = mongoose.model('Vendor', vendorSchema);

module.exports = vendor;