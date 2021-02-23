const mongoose = require('mongoose');
const cityModel = mongoose.Schema({
    cityName: {
        type: String
    },
    category: [{
        type: mongoose.Schema.ObjectId,
        ref:'Categories'
    }]
})

const City = mongoose.model('City', cityModel);