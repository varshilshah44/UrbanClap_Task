const mongoose = require('mongoose');
const validator = require('validator');

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