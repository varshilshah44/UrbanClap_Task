const User = require('../model/userModel');
const Service = require('../model/serviceModel');
const subService = require('../model/subService');
const mongoose = require('mongoose');

exports.createUser = async (req, res, next) => {
    try {
        const data = await User.create(req.body);
        console.log(data);
        res.status(200).json({
            status: "Sucess",
            data: {
                data
            }
        })
        next();
    } catch (err) {
        res.status(401).json({
            status: "Error",
            message: err.message
        })
        console.log(err.message);
    }
}
exports.getUser = async (req, res, next) => {
    try {
        const data = await User.find({}).select('-password')
        console.log(data);
        next();
    } catch (err) {
        console.log(err.message);
    }
}