const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});
// const app = require('./app');
const express = require('express');
const app = express();

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

const port = process.env.PORT || 3000;
app.listen(port);