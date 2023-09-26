const { Types } = require('mongoose');
const model = require('../models/pickupRequest');
const { clearSearch } = require('../utilities/Helper');
const { paginationAggregate } = require('../utilities/pagination');
const Message = require('../utilities/Message');
const io = require("socket.io-client");

class MasterService {

    static async save(data) {
        const socket = io.connect("http://localhost:3100");

        const response = { status: false, resCode: Message.dataSaved.code, message: Message.dataSaved.message };
        try {
            const docData = data._id ? await model.findById(data._id) : new model();

            docData.userId = data.userId;
            docData.productName = data.productName;
            docData.purchaseDate = data.purchaseDate;
            docData.orgPrice = data.orgPrice;
            docData.condition = data.condition;
            docData.status = data.status;

            await docData.save();
            try {
                socket.emit("new-pickup", { msg: "New Pick up Request." });
            } catch (error) {
                console.log(error)
            }
            response.status = true;
            response.message = Message.dataSaved.message;
            response.resCode = Message.dataSaved.code;

            return response;

        } catch (e) {
            throw e
        }
    }

    static async list(query = {}) {
        const $extra = { page: query.page, limit: query.limit, isAll: query.isAll, total: query.total, getTotal: query.getTotal };
        let response = { data: [], extra: { ...$extra }, status: false };

        try {
            const search = {
                _id: query._id ? Array.isArray(query._id) ? query._id?.map(v => Types.ObjectId(v)) : Types.ObjectId(query._id) : '',
                name: query?.key ? { '$regex': new RegExp(query.key || ''), $options: 'i' } : '',
                isDeleted: false
            };

            clearSearch(search);

            const $aggregate = [
                { $match: search },
                { $sort: { _id: -1 } },
            ];
            response = await paginationAggregate(model, $aggregate, $extra);
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
                await model.updateMany({ _id: { $in: ids } }, { isDeleted: true });
            } else if (typeof ids === 'string') {
                await model.updateOne({ _id: ids }, { isDeleted: true });
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