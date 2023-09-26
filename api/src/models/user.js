const { Schema, model, Types } = require('mongoose');
const bcrypt = require('bcryptjs'), SALT_WORK_FACTOR = 10;

const modelSchema = new Schema({
    avatar: {
        type: String,
    },
    username: {
        type: String
    },
    phone: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

modelSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});

module.exports = model('user', modelSchema);