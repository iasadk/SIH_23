const { Schema, model, Types } = require('mongoose');

const modelSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'user'
    },
    coins: {
        type: Number
    },
}, { timestamps: false });

const creditPointModel = model('creditPoint', modelSchema);
module.exports = creditPointModel;