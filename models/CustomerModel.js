const mongoose = require('../dbconnection');
const validator = require('validator');

const customerSchema = new mongoose.Schema({
    customerName:{
        type:String,
        default:'Verified Customer',
        validate:[/^[a-zA-Z\s]+$/,'Name only contains alphabets and spaces']
    },
    customerEmail:{
        type:String,
        validate:[validator.isEmail,'Email is not valid'],
        unique:true     
    },
    customerMobile:{
        type:String,
        required:[true,'MobileNo must be required'],
        validate:[/^(\+\d{1,3}[- ]?)?\d{10}$/,'MobileNo is not valid']
    },
    customerAddress:{
        type:String
    },
    customerStatus:{
        type:String,
        default:'active'               
    }
});

const Customer = mongoose.model('Customer',customerSchema);

module.exports = Customer;
