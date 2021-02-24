const mongoose = require('../dbconnection');
const Service = require('./ServicesModel');
const ServiceCategory = require('./ServiceCategoryModel');
const ServiceProvider = require('./ServiceProviderModel');
const Customer = require('./CustomerModel');
const BookingSchema = new mongoose.Schema({ 
    customerId:{
        type:mongoose.Schema.ObjectId,
        ref:'Customer'
    },
    serviceDate:{
        type:Date,
        required:[true,'date selection is required']
    },
    bookingDate:{
        type:Date,
        required:[true,'date selection is required'] 
    },
    serviceTime:{
        type:String,
        required:[true,'time is required']
    },
    services:{
        serviceId:{
            type:mongoose.Schema.ObjectId,
            ref:'Service',
            required:[true,'serviceId is required']
        },
        workTypeDetails:[
                {
                    workTypeName:{
                        type:String,
                        required:[true,'workTypeName is required']
                    },
                    qty:{
                        type:Number,
                        required:[true,'Qty is required']
                    },
                    price:{
                        type:Number,
                        required:[true,'price is required']
                    }
                }
        ],
        ServiceCategoryId:{
            type:mongoose.Schema.ObjectId,
            ref:'ServiceCategory'
        }
    },
    totalPrice:{
        type:Number,
        required:[true,'totalPrice is required']
    },
    paymentMode:{
        type:String,
        required:[true,'paymentMode is required']
    },
    bookingStatus:{
        type:String
    },
    serviceProviderId:{
        type:mongoose.Schema.ObjectId,
        ref:'ServiceProvider'
    }

});

const Booking = mongoose.model('Booking',BookingSchema);
module.exports = Booking;

