const mongoose = require('mongoose');
const validator = require('validator');

// BOOKING LIST OF LOGED IN USER
const bookingListSchema = new mongoose.Schema(
    [
        {
            serviceName: {
                type: String,
                required: [true, 'Service Name is required']
            },
            vendorId: {
                type: mongoose.Types.ObjectId,      // Can get vendor number through ref
                ref: 'Vendor',
                required: [true, 'Vendor Id is required']
            },
            quantity: {
                type: Number,
                default: 1
            },
            price: {
                type: Number,
                required: [true, 'Price is required']
            },
            totalPrice:{
                type: Number,
                default: this.price                
            },
            rating: {
                type: Number,
                required: [true, 'Rating is required']
            },
            message: {
                type: String
            }
        }
    ]
)