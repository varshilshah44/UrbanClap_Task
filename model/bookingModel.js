const mongoose = require('mongoose');
const bookingSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: [true, 'Please Enter your name']
    },
    email: {
        type: String,
        unique: true,
        validator: [validator.isEmail, 'Enter Valis Email']
    },
    address: String,
    category: {
        type: String,
        required: [true, 'Booking must be for any Category']
    },
    service: {
        name: String,
        required: [true, 'Booking must be for any Particular Category'],

        tags: [{
            type: String,
            required: [true, 'Booking must be for any Particular Tag'],
            price: {
                type: Number
            },
            qty: {
                type: Number,
                default: 1
            },
        }],
    },
    totalPrice: {
        type: Number,
        default: this.price
    },
    date: Date,
    time: Date.now().time(),
    serviceLocation: {
        type: String
    },
    paymentMode: {
        type: String
    },
    status: {
        type: String,
        enum: ['active', 'cancel', 'done']
    },
    serviceProviderId: {
        type: mongoose.Schema.ObjectId,
        ref: 'ServiceProvider'
    },
    vendorResponse: {
        type: Boolean,
        //1 accept  //0 reject
        //select and pass tag id and user id in body to accept  
    }
})

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;