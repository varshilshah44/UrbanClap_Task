const mongoose = require('../dbconnection');
const ServiceCategory = require('./ServiceCategoryModel');
const CitiesSchema = new mongoose.Schema({
    CityName:{
        type:String,
    },
    ServiceCategoryId:[{
        type:mongoose.Schema.ObjectId,
        ref:'ServiceCategory'
    }]
});

const City = mongoose.model('City',CitiesSchema);

