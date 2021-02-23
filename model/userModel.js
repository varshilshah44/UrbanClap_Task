const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    number: {
        type: Number,
        required: [true, 'A user must provide mobile Number']
    },
    name: {
        type: String,
        default: 'Verified User'
    },
    email: {
        type: String,
        unique: true,
        validator: [validator.isEmail, 'Enter valid email Id']
    },
    address: {
        type: String
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'service provider']
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;