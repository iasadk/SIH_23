const { Types } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Logger = require('../utilities/Logger');
const Response = require('../utilities/Response');
const Message = require('../utilities/Message');
const adminModel = require('../models/user');
const config = require('../config');
const { clearSearch } = require('../utilities/Helper');
const { paginationAggregate } = require('../utilities/pagination');

class MasterService {
    static async login({ email, password }) {
        try {
            const response = { data: {}, status: false };

            const user = await adminModel.findOne({ email });

            if (!user) {
                throw new Error('Account does not exist');
            }

            let isPasswordMatched = await bcrypt.compare(password, user.password);
            if (!isPasswordMatched) {
                throw new Error("Invalid Credentials");
            } else {
                const JWT_EXP_DUR = config.jwt.expDuration;
                const accessToken = jwt.sign({ sub: user._id.toString(), exp: Math.floor(Date.now() / 1000) + ((JWT_EXP_DUR) * 60), }, config.jwt.secretKey);
                const type = user.type;
                response.data.accessToken = accessToken;
                response.data.type = type;
                response.data.adminRights = user?.adminRights;

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
            const docData = await adminModel.findById(data._id);

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
            const result = await adminModel.findById(cuser._id).select('-password -type -createdAt -updatedAt -__v').lean();

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
    static async trackWasteOrder(cuser) {
        const response = {
            resCode: Message.noContent.code,
            message: Message.noContent.message,
            data: {
            },
        };

        const sample = [
            { facilityName: "M/s. HMG Eco care Recycling", credit: "5",progressPercentage: 25,productName:"Belkin AC Anywhere - F5C400300W" },
            { facilityName: "M/s. Earth Care E-waste Private Limited", credit: "20.6",progressPercentage: 60,productName:"Sanus 15' - 40' Flat Panel TV Black Wall Mount - VM400B" },
            { facilityName: "M/s. E-Plant Recycling", credit: "3.5",progressPercentage: 50,productName:"Bose Acoustimass 5 Series III Speaker System - AM53BK" }
        ]
        const randIdx = Math.floor(Math.random() * sample.length);
        try {
            const data = { progressPercentage: sample[randIdx].progressPercentage, facilityName: sample[randIdx].facilityName, productName: sample[randIdx].productName, productPurchaseDate: "11 September, 2023", credit: sample[randIdx].credit }

            response.data = data;
            if (response.data.result) {
                response.message = Message.dataFound.message;
                response.resCode = Message.dataFound.code;
            }
            return response;
        } catch (e) {
            throw Response.createError(Message.dataFetchingError, e);
        }
    }
    static async trackWasteHistory(cuser) {
        const response = {
            resCode: Message.noContent.code,
            message: Message.noContent.message,
            data: {
            },
        };

        const sample = [
            {
              id: "1",
              facility: "M/s. HMG Eco care Recycling",
              product: "Sony 5 Disc CD Player - CDPCE375",
              creditEarned: "1000",
            },
            {
              id: "2",
              facility: "GreenTech Recycling Solutions",
              product: "Bose Acoustimass 5 Series III Speaker System - AM53BK",
              creditEarned: "800",
            },
            {
              id: "3",
              facility: "Eco-Friendly Disposals",
              product: "Sony Switcher - SBV40S",
              creditEarned: "1200",
            },
            {
              id: "4",
              facility: "Sustainable Electronics Recycling",
              product: "Panasonic Yeast Pro Automatic Breadmaker - SDYD250",
              creditEarned: "600",
            },
            {
              id: "5",
              facility: "EarthSavers Recycling",
              product: "Sony 300 Disc CD Changer - CDPCX355",
              creditEarned: "900",
            },
          ]
        try {

            response.data = sample;
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
            const docData = await adminModel.findById(cuser._id);
            if (!docData) {
                throw new Error('');
            }

            docData.cityId = data.cityId;
            docData.stateId = data.stateId;
            docData.country = data.country;
            // docData.avatar = data.avatar;
            docData.firstName = data.firstName;
            docData.lastName = data.lastName;
            docData.pinCode = data.pinCode;
            docData.phone = data.phone;
            // docData.email = data.email;

            await docData.save();

            response.message = Message.profileUpdate.message;
            response.resCode = Message.profileUpdate.code;

            return response;

        } catch (e) {
            throw Response.createError(Message.dataSavingError, e);
        }
    }

    static async changeAvatar(data) {
        const response = { resCode: Message.profileUpdateError.code, message: Message.profileUpdateError.message };

        try {
            const docData = await adminModel.findById(data.adminId);
            docData.avatar = data.avatar;

            await docData.save();

            response.message = Message.profileUpdate.message;
            response.resCode = Message.profileUpdate.code;

            return response;

        } catch (e) {
            throw Response.createError(Message.dataSavingError, e);
        }
    }

    static async list(query = {}) {
        const $extra = { page: query.page, limit: query.limit, isAll: query.isAll, total: query.total, getTotal: query.getTotal };
        let response = { data: [], extra: { ...$extra }, status: false };

        try {
            const search = {
                _id: query._id ? Array.isArray(query._id) ? query._id?.map(v => Types.ObjectId(v)) : Types.ObjectId(query._id) : '',
                isDeleted: false
            };

            clearSearch(search);
            console.log(search)
            const $aggregate = [
                { $match: search },
                { $sort: { _id: -1 } },
            ];
            response = await paginationAggregate(adminModel, $aggregate, $extra);
            response.status = true;
            return response;
        } catch (err) {
            throw err;
        }
    }
    static async save(data) {
        const _id = data._id;
        const response = { data: {}, status: false };

        try {
            const docData = _id ? await adminModel.findById(_id) : new adminModel();
            docData.username = data.username;
            !data.password || (docData.password = data.password);
            docData.phone = data.phone;
            docData.address = data.address;
            docData.email = data.email;
            await docData.save();

            response.data = docData;
            response.status = true;

            return response;

        } catch (err) {
            throw err;
        }
    }
    static async delete(ids) {
        const response = { status: false, ids: [] };
        try {

            if (Array.isArray(ids)) {
                await adminModel.updateMany({ _id: { $in: ids } }, { isDeleted: true });
            } else if (typeof ids === 'string') {
                await adminModel.updateOne({ _id: ids }, { isDeleted: true });
                response.id = ids
            }

            response.status = true;
            response.ids = ids;

            return response;
        } catch (err) {
            throw err;
        }
    }

}

module.exports = MasterService;