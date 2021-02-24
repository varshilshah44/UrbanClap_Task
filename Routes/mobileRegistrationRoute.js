const express = require('express');
const router = express.Router();

const mobileRegistrationController = require('../Controllers/mobileRegistrationController');

router.route('').post(mobileRegistrationController.checkBody,mobileRegistrationController.registerMobileNo);
router.route('/verifyOtp').post(mobileRegistrationController.checkBody,mobileRegistrationController.verifyOTP);

module.exports = router;