const mongoose = require('mongoose');
// const { db } = require('./services');
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

const categoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Category must have a name']
    },
    // services: {
    //     type: mongoose.Schema.ObjectID,
    //     ref: 'Services'
    // },
    // tags: {
    //     type: mongoose.Schema.objectId,
    //     ref: Tags
    // },
})

const Categories = mongoose.model('Categories', categoriesSchema);
module.exports = Categories;


