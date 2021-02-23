const User = require('../model/userModel');
const Service = require('../model/serviceModel');
const subService = require('../model/subService');
const mongoose = require('mongoose');

exports.createService = async (req, res, next) => {
    try {
        // const subService = await subService.findById(req.params.id)
        // const data = await Service.create(req.body)
        const data = await Service.create({
            mainService: req.body.mainService,
            picture: req.body.picture
        });
        console.log(data);
        res.status(200).json({
            status: "Success",
            data: {
                data
            }
        })
        next()
    } catch (err) {
        res.status(401).json({
            status: "Error",
            message: err.message
        })
        console.log(err.message);
    }
}

exports.getService = async (req, res, next) => {
    try {
        // const subService = await subService.findById(req.params.id)
        // const data = await Service.create(req.body)
        const data = await Service.findById(req.params.id).select('-_id -__v');
        res.status(200).json({
            status: "Success",
            data: {
                data
            }
        })
        next()
    } catch (err) {
        res.status(401).json({
            status: "Error",
            message: err.message
        })

    }
}