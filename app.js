const express = require('express');

const userController = require('./controller/userController');
const serviceController = require('./controller/serviceController');
const subServiceController = require('./controller/subServiceController');


const app = express();
const router = express.Router();

app.use(express.json());

////////////////////////////////////////////
// USER CREATION
app.post('/user/signup', userController.createUser);

////////////////////////////////////////////
// MAIN SERVICES Routes

// Displaying The main Service by it's id
app.get('/services/:id', serviceController.getService);

// Creating Main Service in Service Collection
app.post('/services', serviceController.createService);

////////////////////////////////////////////
//SUBSERVICE

// CREATES THE SUBSERVICE ARRAY
app.post('/services/subService/create', subServiceController.createServiceArray);

// ADD SERVICE INSIDE SUBSERVICE ARRAY
app.post('/services/subService/add/:id', subServiceController.addService);

// Will get all the subservices of Main service by passing id
app.get('/services/subService/:id', subServiceController.getArray);

////////////////////////////////////////////

//USERS ROUTES
app.get('/users', userController.getUser);

module.exports = app;