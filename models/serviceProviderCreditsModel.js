const mongoose = require('../dbconnection');
const ServiceProvider = require('./ServiceProviderModel');

const serviceProviderCreditsSchema = new mongoose.Schema({
    serviceProviderId:{
        type:mongoose.Schema.ObjectId,
        ref:'ServiceProvider'
    },
    serviceProviderTotalCredits:{
        type:Number,
        default:0
    }      
});

const serviceProviderCredits = mongoose.model('serviceProviderCredits',serviceProviderCreditsSchema);