const express = require('express');
const router = express.Router();

const mobileRegistrationController = require('../Controllers/mobileRegistrationController');

router.route('').post(mobileRegistrationController.registerMobileNo);

module.exports = router;