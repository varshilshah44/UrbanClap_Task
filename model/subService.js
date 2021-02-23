const mongoose = require('mongoose');
const validator = require('validator');

try {

    const subServiceSchema = new mongoose.Schema({
        mainService: {
            type: mongoose.Schema.ObjectId,
            ref: 'Service'
        },
        subService: {
            type: String,
            required: true,
            unique: true
        },
        service: {
            type: String,
            required: true,
            unique: true
        },
        totalTime: {
            type: Number,
            required: [true, 'Total Time of Service is required']
        },
        details: {
            type: String,
            required: [true, 'Details of service is required']
        },
        options: [{
            //{
            //     type: Array,
            //     uniqueItems: true,
            //     additionalProperties: false,
            //     items: {
            //         type: Object,
            //         required: ["name", "picture", "price"],
            //         uniqueItems: true,
            //         additionalProperties: true,
            //         properties: {
            name: {
                type: String,
                required: [true, 'Name of service is required'],
                unique: true
            },
            picture: {
                type: String,
                // For now not required
                required: [true, 'Image of service is required']
            },
            price: {
                type: Number,
                required: [true, 'Price is required']
            },
            details: {
                type: String
            },
            ingredients: {
                type: String
            }
            // reviews:{

            // }
        }
            //  }
        ],
        // OPTIONAL FIELDS IF THERE ARE NO OPTIONS ARRAY
        price: Number,
        picture: String
    });

    const subService = mongoose.model('SubService', subServiceSchema);

    module.exports = subService;
} catch (err) {
    console.log(err);
}