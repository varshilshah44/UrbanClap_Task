const mongoose = require('mongoose');
const serviceProviderDetailSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Servie Provider must have a name']
    },
    number: {
        type: Number,
        required: [true, 'Servie Provider must provide their number']
    },
    email: {
        type: String,
        required: [true, 'Servie Provider must provide their email'],
        unique: true 
    },
    category: {
        type: String,
        required: [true, 'Servie Provider must select their service category']
    },
    IdentityVerification: {
        identityProof: {
            type: String,
            required: [true, 'You must upload your Identity Proof']
        },
        personalDetails: {
            
        },
        currentAddress: {
            type: String,
            required: [true, 'Please provide your current Address']
        },
        selfDeclaration: {
            type: String,
            required: [true, 'Provide Self Declaration']
        }
    },
    uploadPhotosOfYourWork = [{
        type: String
    }],
    awardAndCertificate =[{
        type: String
    }],
    serviceLocation: {
        type: String,
        required: [true, 'You must select your service Location']
    },
    references: [{
        name: String
    }],
    availableCredits: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: 1 //Available
    }
})

const ServiceProviderDetail = mongoose.model('ServiceProviderDetail', serviceProviderDetailSchema);
module.exports = ServiceProviderDetail;