const mongoose = require('../dbconnection');
const ServiceProvider = require('./ServiceProviderModel');
const Booking = require('./BookingModel');

const serviceProviderJobSchema = new mongoose.Schema({
    serviceProviderId:{
        type:mongoose.Schema.ObjectId,
        ref:'ServiceProvider'
    },
    bookingId:{
        type:mongoose.Schema.ObjectId,
        ref:'Booking'  
    },
    serviceProviderJobStatus:{
        type:String
    }
});

const serviceProviderJob = mongoose.model('serviceProviderJob',serviceProviderJobSchema);