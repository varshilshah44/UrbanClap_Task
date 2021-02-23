const mongoose = require('mongoose');
const validator = require('validator');

const reviewModel = new mongoose.Schema({
    serviceName: {
        type: String,
        required: true
    },
    vendorId: [
        {
            type: String,
            required: true
        }
    ],
    userId: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]

})