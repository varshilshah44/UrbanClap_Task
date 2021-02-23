const mongoose = require('mongoose');
const validator = require('validator');

const reviewModel = new mongoose.Schema({
    serviceName: {
        type: mongoose.Types.ObjectId,
        ref:'Service',
        required: [true,'Invalid Service']
    },
    vendorId: {
        type: mongoose.Types.ObjectId,
        ref: 'Vendor',
        required: [true,'Review must have a Vendor']
    },
    // overallVendorRating: {      // Can also create through aggregation if needed
    //     type: Number
    // },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true,'Review must belong to a User']
    },
    userReview: {
        type: String,
        required: true
    },
    userRating: {
        type: Number,
        required: true
    },
    reviewDate: {
        type: Date,
        required: true
    }
})