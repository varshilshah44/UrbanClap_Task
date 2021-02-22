const mongoose = require('../dbconnection');
const Customer = require('./CustomerModel');

const paymentHistorySchema = new mongoose.Schema({
   customerId:{
       type:mongoose.Schema.ObjectId,
       ref:'Customer'
   },
   Amount:{
       type:Number
   },
   commision:{
       type:Number
   } 
});

const paymentHistory = mongoose.model('paymentHistory',paymentHistorySchema);