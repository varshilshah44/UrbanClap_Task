const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose
    // .connect(process.env.LOCAL_DATABASE, {}) //TO connect Local Database
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(con => console.log("DB connection successful 👍"));
    
const servicesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Services must have a name']
    },
    tags: [{

        name: String,
        price: Number,
        description: String

    }],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Categories'
    }
});

const Service = mongoose.model('Service', servicesSchema);

// const ser1 = new Service({
//     name: 'Blockage', 
//     category: '6030ec26c45834056c07c08c',
//     tags: [{ name: 'Balcony Pipe', price: 269 }, { name: 'Drainage Pipe', price: 369 }]
// })
// ser1.save();
module.exports = Service;

