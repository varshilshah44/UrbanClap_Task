const mongoose = require('mongoose');
const validator = require('validator');

const serviceSchema = new mongoose.Schema({
    mainService: {
        type: String,
        required: [true, 'Service Name is required'],
        unique: true
    },
    picture: {
        type: String
    },
    city:{
        type: String,
        required: true
    }
}, { collection: 'Service' });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;