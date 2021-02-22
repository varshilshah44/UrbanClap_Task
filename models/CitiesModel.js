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

//testing 

/* const obj = {
    CityName:'Ahmedabad',
    ServiceCategoryId:['602f4ffee8cc7241706ae2e9']
}

const createCity = async () => {
    try{
    const city = await City.create(obj);
    console.log('added');
    }
    catch(err){
        console.log('\nError ⚡ ' + err.message);
    }
}
const getCities = async () => {
    try{
    const cities = await City.find().populate({
        path:'ServiceCategoryId'
    });
    }
    catch(err){
        console.log('\nError ⚡ ' + err.message);
    }
}
createCity();    
getCities();  */