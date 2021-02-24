const fast2sms = require('fast-two-sms');

exports.sendOTP = async (otp,mobileNo) => {
    const options = {
        authorization : process.env.MOBILE_API, 
        message : `Your otp is ${otp}`,
        numbers : [mobileNo]
    }
    const response = await fast2sms.sendMessage(options);
    return response;
}
