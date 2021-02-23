const mongoose = require('mongoose');
const validator = require('validator');

// OPTIONAL
const leadsSchema = new mongoose.Schema({
    vendorId: {
        type: mongoose.Types.ObjectId,
        ref: 'Vendor'
    },
    userName: {
        type: String,
        required: true
    },
    userAddress: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true
    },
    leadsTime: {
        type: Date,
        required: true,
        unique: true
    },
    tag: {
        type: String,
        enum: ['Missed', 'Job Completed', 'Ongoing', 'Rejected']
    }
})

exports.leads = mongoose.model('Leads', leadsSchema);