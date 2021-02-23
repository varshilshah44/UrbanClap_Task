const mongoose = require('../dbconnection');
const Service = require('./ServicesModel');
const ServiceCategory = require('./ServiceCategoryModel');
const ServiceProvider = require('./ServiceProviderModel');
const BookingSchema = new mongoose.Schema({ 
    customerName:{
        type:String,
        required:[true,'customerName is required'],
        validate:[/^[a-zA-Z\s]+$/,'customerName is not valid']
    },
    customerMobileNo:{
        type:String,
        required:[true,'MobileNo must be required'],
        validate:[/^(\+\d{1,3}[- ]?)?\d{10}$/,'MobileNo is not valid']
    },
    address:{
        type:String,
        required:[true,'address must be required']
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
            required:[true,'serviceId is required'],
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
            ]
        },
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
    serviceProvider:{
        type:mongoose.Schema.ObjectId,
        ref:'ServiceProvider'
    }

});

const Booking = mongoose.model('Booking',BookingSchema);
module.exports = Booking;

//testing
/* const obj = {
    customerName:'Varshil',
    serviceProviderId:'602f883fad1b0e24e8cd1fff',
    customerMobileNo:'9428712306',
    address:'c-7,nirav flat,shantivan,paldi,ahmedabad-380007',
    date:new Date(),
    time:'5:30',
    services:{
        serviceId:'602f6580229b675088f1aa66',
        workTypeName:'abcc',
        qty:3,
        price:300       //100 for each service
    },
    totalPrice:300,
    paymentMode:'cash'
}

const createBooking = async () => {
    try{
    await Booking.create(obj);
    console.log("added")
    }
    catch(err){
        console.log(err.message);
    }
}

createBooking(); */