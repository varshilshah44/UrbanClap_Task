const mongoose = require('../dbconnection');
const ServiceCategorySchema = new mongoose.Schema({
    serviceCategoryName:{
        type:String,
        required:[true,'Category Name is required'],
        unique:true,
        validate:[/^[a-zA-Z\s]+$/,'CategoryName only contains alphabets and spaces']
    },
    serviceCategoryImages:{
        mainImage:String,
        subImages:[String]
    }
});

const ServiceCategory = mongoose.model('ServiceCategory',ServiceCategorySchema);
module.exports = ServiceCategory;


//testing 

/* const obj = {
    serviceCategoryName:'hello',
    serviceCategoryImages:['abc','pqr']
}

const createCategory = async () => {
    try{
    const serviceCategory = await ServiceCategory.create(obj);
    console.log('added');
    }
    catch(err){
        console.log('\nError ⚡ ' + err.message);
    }
}
createCategory();  */   