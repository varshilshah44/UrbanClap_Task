const User = require('../model/userModel');
const Service = require('../model/serviceModel');
const subService = require('../model/subService');
const mongoose = require('mongoose');

// CREATES THE SUBSERVICE ARRAY
exports.createServiceArray = async (req, res, next) => {
    try {
        console.log("Sub Services....");
        const data = await subService.create(req.body);
        //await subService.findByIdAndUpdate(req.params.id, { "$push": { "children": req.body } });
        console.log('DATA: ', data);
        // await subService.save();
        res.status(200).json({
            status: "Success",
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

// ADD SERVICE INSIDE SUBSERVICE ARRAY
exports.addService = async (req, res, next) => {
    try {
        const cmp =  await {...subService.find().select('options')};
        // console.log(cmp);
        if(!req.body.name || !req.body.picture)  throw new Error('One or more detail is missing')
        const data =
            // await subService.create(req.body);
            await subService.findByIdAndUpdate(req.params.id, { "$addToSet": { "options": req.body } }, {
                new: true,
                runValidators: true
            });
        console.log('DATA: ', data);        
        // await subService.save();
        res.status(200).json({
            status: "Success",
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

exports.getArray = async (req, res, next) => {
    try {
        const ObjectId = mongoose.Types.ObjectId;

        const data =
            // subService.findById(req.params.id).populate('mainService').select('-__v -_id -options._id -mainService._id -mainService.__v');
            await subService.aggregate([
                {
                    $match: { mainService: ObjectId(req.params.id) }
                },
                {
                    $project: {
                        _id: 0,
                        subService: 1,
                        service: 1,
                        totalTime: 1,
                        details: 1,
                        options: { $size: '$options' },
                        price: {
                            // If there are no options then it will show the price field
                            // else will show the min value of options.price
                            $cond: {
                                if: {$eq: [{ $size: '$options' }, 0]}, then: '$price',
                                else: { $min: '$options.price' }
                            }
                        }

                    }
                }
            ])
        console.log('DATA: ', data);
        res.status(200).json({
            status: "Success",
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