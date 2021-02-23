const mongoose = require('mongoose');
const validator = require('validator');

// Seems like we can omit this collection as we've added cities in MainService, User and Vendor Collection
const citySchema =new mongoose.Schema({
    country: {
        type: String,
        enum: ['India','Australia','UAE']   // AS it's only available here only
    },
    cityName: {
        type: String,
        required: true
    }
})