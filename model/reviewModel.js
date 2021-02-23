const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.ObjectId
    },
    review: {
        type: String,
        required: [true, 'Please provide review for the service']
    },
    ratings: {
        type: Number,
        required: [true, 'Please give your ratings'],
        min: 1,
        max: 5
    },
    createdAt: Date,
    services: {
        name: String,
        serviceId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Services'
        }
    },
    tags: {
        name: String,
        tagId: {
            type: mongoose.Schema.ObjectId,
            ref: 'Tags'
        }
    }
})

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;