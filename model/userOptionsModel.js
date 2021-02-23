const mongoose = require('mongoose');
const userOptionsSchema = new mongoose.Schema({
    registerAsPartner: {
        type: Boolean,
        default: false
    },
    myGiftCards = [{
        type: String,
        default: null
    }],
    myWallet = {
        type: Number,
        default: 0
    },
    addPaymentOptions: [{
        type: String,
        default: null
    }],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

const UserOptions = mongoose.model('UserOptions', userOptionsSchema);
module.exports = UserOptions;