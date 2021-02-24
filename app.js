const express = require('express');
const morgan = require('morgan');
const app = express();

const mobileRegistrationRouter = require('./Routes/mobileRegistrationRoute');

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/mobileRegistration',mobileRegistrationRouter);

app.use((err,req,res,next) => {
     res.status(err.statusCode).json({
         status:'error',
         message:err.message
     })   
})

module.exports = app; 