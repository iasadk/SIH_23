const { Types } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Logger = require('../utilities/Logger');
const Response = require('../utilities/Response');
const Message = require('../utilities/Message');
const userModel = require('../models/admin');
const config = require('../config');
const { genFileUrlFromId, clearSearch, genFileUrl } = require('../utilities/Helper');
const { paginationAggregate } = require('../utilities/pagination');

class MasterService {
    static async login({ code, password }) {
        try {

            const response = { data: {}, status: false };

            const user = await userModel.findOne({ email: code });

            if (!user) {
                throw new Error('User does not exist');
            }

            let isPasswordMatched = await bcrypt.compare(password, user.password);
            if (!isPasswordMatched) {
                throw new Error("Invalid Credentials");
            } else if (!user.status) {
                throw new Error('Account is blocked. Contact Admin!!');
            } else {
                const JWT_EXP_DUR = config.jwt.expDuration;
                const accessToken = jwt.sign({ sub: user._id.toString(), exp: Math.floor(Date.now() / 1000) + ((JWT_EXP_DUR) * 60), }, config.jwt.secretKey);
                const type = user.type;
                response.data.accessToken = accessToken;
                response.data.type = type;
                // response.data.user = user;
                response.data.modules = user?.modules;

                response.status = true;

            }


            return response;

        } catch (e) {
            throw e;
        }
    }

    static async updatePassword(data) {
        const response = { resCode: Message.internalServerError.code, message: Message.internalServerError.message };

        try {
            const docData = await userModel.findById(data._id);

            docData.password = data.newPassword;
            docData.status = data.status;

            await docData.save();

            response.message = "Password updated";
            response.resCode = Message.dataSaved.code;

            return response;

        } catch (e) {
            throw Response.createError(Message.dataSavingError, e);
        }
    }

    static async profile(cuser) {
        const response = {
            resCode: Message.noContent.code,
            message: Message.noContent.message,
            data: {
                result: {}
            },
        };

        try {
            const result = await userModel.findById(cuser._id).select('-password -type -_id -createdAt -updatedAt -__v').lean();

            response.data.result = result;
            if (response.data.result) {
                response.message = Message.dataFound.message;
                response.resCode = Message.dataFound.code;
            }
            return response;
        } catch (e) {
            throw Response.createError(Message.dataFetchingError, e);
        }
    }

    static async saveProfile(data, cuser) {
        const response = { resCode: Message.profileUpdateError.code, message: Message.profileUpdateError.message };

        try {
            const docData = await userModel.findById(cuser._id);
            if (!docData) {
                throw new Error('');
            }

            docData.avatar = data.avatar;
            docData.name = data.name;
            docData.code = data.code;
            docData.email = data.email;
            docData.mobile = data.mobile;
            docData.about = data.about;

            await docData.save();

            response.message = Message.profileUpdate.message;
            response.resCode = Message.profileUpdate.code;

            return response;

        } catch (e) {
            throw Response.createError(Message.dataSavingError, e);
        }
    }


}

module.exports = MasterService;