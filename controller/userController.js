const mongoose = require('mongoose');
const {promisify} = require('util');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../model/userModel');
const Service = require('../model/serviceModel');
const subService = require('../model/subService');

exports.createUser = async (req, res, next) => {
    try {
        if (req.body.password !== req.body.confirmPassword) throw new Error('Password does not match');
        // console.log(req.body);
        req.body.password = await bcrypt.hash(req.body.password, 12);
        const data = await User.create({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city,
            address: req.body.address,
            role: req.body.role,
            password: req.body.password
        });

        login();
        next();
    } catch (err) {
        res.status(400).json({
            status: "Error",
            message: err.message
        })
        console.log(err.message);
    }
}

exports.login = async (req, res, next) => {
    try {
        const  {email, password}  = req.body;
        const user = await User.findOne({ email: email }).select('+password');
        if (!await bcrypt.compare(password,user.password)) throw new Error('Incorrect user email or password')
        
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        console.log('Loged In...');
        res.status(201).json({
            status: "Success",
            token,
            message: "Logged In"
        })
        next();        
    } catch (err) {
        res.status(401).json({
            status: "Failed",
            message: err.message
        })
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const data = await User.find({}).select('-password');
        console.log(data);
        next();
    } catch (err) {
        console.log(err.message);
    }
}
exports.verifyUser = async (user) => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: user.email,
        subject: "Please verify your email",
        text: "asgasg"
    }
    await transport.sendMail(mailOptions);
}

exports.verify = async (req,res,next)=>{
    try {
        let token = req.headers.authorization.split(' ')[1];
        const decode = await jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode);
        next();        
    } catch (err) {
        res.status(401).json({
            status: "Failed",
            message: "User timeout, please login again to get access"
        })        
    }
}

/* exports.otpVerify = async (req,res,next)=>{

} */