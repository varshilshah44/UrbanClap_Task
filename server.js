const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connection successful!'));

const PORT = process.env.PORT

app.listen(7000, () => {
    console.log('Server has started....')
});