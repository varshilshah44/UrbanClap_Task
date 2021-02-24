const mobileVerification = require("../models/mobileVerificationModel");
const Customer = require("../models/CustomerModel");
const sendSMSController = require("./sendSMSController");
const appError = require("../utils/appError");

function generateOtp() {
  let otp = "";
  for (let i = 0; i < 4; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

exports.checkBody = (req, res, next) => {
  console.log(req.body.mobileNo)
  if (!req.body.mobileNo || !req.body.userType) {
    return next(new appError("Please provide mobileno and userType", 404));
  }
  next();
};

 const registerCustomer = async (mobileno) => {
   const customer = await Customer.findOne({ customerMobile: mobileno });
    if (!customer) {
     await Customer.create({
        customerMobile: mobileno,
      });
    }
}; 

exports.verifyOTP = async (req, res, next) => {
  try {
    const user = await mobileVerification.findOne({
      mobileNo: req.body.mobileNo,
      userType: req.body.userType,
    });

    if (!user) {
      return next(new appError("User doesn't register his/her mobileNo", 404));
    }

    if (new Date(user.mobileVerificationOtpExpire).getTime() < new Date(Date.now()).getTime()) {
      user.mobileVerificationOtp = undefined;
      user.mobileVerificationOtpExpire = undefined;
      user.save();
      return next(new appError("OPT is expired", 404));
    }

    if (
      !(await user.compareOtp(
        req.body.mobileVerificationOtp,
        user.mobileVerificationOtp
      ))
    ) {
      return next(new appError("OTP is not correct", 404));
    }

    user.mobileVerificationOtp = undefined;
    user.mobileVerificationOtpExpire = undefined;
    user.save();

    const customer = await Customer.findOne({ customerMobile: req.body.mobileNo });
    console.log("hello")
    if (!customer) {
     await Customer.create({
        customerMobile: req.body.mobileNo,
    });
    }

    res.status(200).json({
      status: "success",
      message: "You are verified successfully",
    });
  } catch (err) {
    return next(new appError(err.message, 500));
  }
};

exports.registerMobileNo = async (req, res, next) => {
  try {
    const otp = generateOtp();

    const response = await sendSMSController.sendOTP(otp, req.body.mobileNo);
    if (!response.return) {
      return next(new appError(response.message, 404));
    }

    const user = await mobileVerification.findOne({
      mobileNo: req.body.mobileNo,
      userType: req.body.userType,
    });

    if (!user) {
      await mobileVerification.create({
        mobileNo: req.body.mobileNo,
        mobileVerificationOtp: otp,
        userType: req.body.userType,
        mobileVerificationOtpExpire:Date.now() + (60 * 1000)
      });
    } else {
      const updateData = await mobileVerification.findByIdAndUpdate(
        user._id,
        {
          mobileVerificationOtp: otp,
          mobileVerificationOtpExpire: Date.now() + (60 * 1000),
        },
        {
          new: true,
        }
      );
      console.log(updateData);
      updateData.save();
    }

    res.status(201).json({
      status: "success",
      message: "OTP is sent to your mobile phone",
    });
  } catch (err) {
    return next(new appError(err.message, 500));
  }
};
