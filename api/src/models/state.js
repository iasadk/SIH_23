const { Schema, model, Types } = require('mongoose');

const modelSchema = new Schema({
    countryId: {
        type: Types.ObjectId,
        ref: 'country'
    },
    name: {
        type: String,
    },
    code: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: false });

modelSchema.index({ 'countryId': 1 });
const stateModel = model('state', modelSchema);
module.exports = stateModel;