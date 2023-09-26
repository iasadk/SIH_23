const { Schema, model } = require('mongoose');

const modelSchema = new Schema({
    name: {
        type: String,
    },
    code: {
        type: String,
    },
    currency: {
        type: String,
    },
    currency_symbol: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: false });


const countryModel = model('country', modelSchema);
module.exports = countryModel;