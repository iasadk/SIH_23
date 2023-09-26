const { Schema, model, Types } = require('mongoose');

const modelSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        ref: 'user'
    },
    productName: {
        type: String,
    },
    pickUpDate: {
        type: String,
    },
    orgPrice: {
        type: String,
    },
    approxCredit: {
        type: String,
    },
    purchaseDate: {
        type: String,
    },
    condition: {
        type: String,
    },
    status: {
        type: String,
        enum:["Initiated","Pick Up Confirmed","Pick Up Failed", "Credited"]
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: false });

const pickUpModel = model('pickup', modelSchema);
module.exports = pickUpModel;