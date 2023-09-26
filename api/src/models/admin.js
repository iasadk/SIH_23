const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs'), SALT_WORK_FACTOR = 10;

const modelSchema = new Schema({

    avatar: {
        uid: String,
        url: String,
    },

    name: String,
    phone: String,
    email: String,
    adminName: {
        type: String,
        unique: true
    },
    password: String,
    status: {
        type: Boolean,
        default: true
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

module.exports = model('admin', modelSchema);