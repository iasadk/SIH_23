const { Types } = require('mongoose');
const model = require('../models/creditPoints');
const { clearSearch } = require('../utilities/Helper');
const { paginationAggregate } = require('../utilities/pagination');
const Message = require('../utilities/Message');

class MasterService {

    static async save(data) {
        const response = { status: false, resCode: Message.dataSaved.code, message: Message.dataSaved.message };

        try {
            const docData = data._id ? await model.findById(data._id) : new model();

            docData.userId = data.userId;
            docData.coins = data.coins;

            await docData.save();
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
                userId: query.userId ? query.userId : '',
            };

            clearSearch(search);
            
            const $aggregate = [
                { $match: search },
                { $sort: { _id: -1 } },
                {
                    $group: {
                        _id: null,
                        totalCoins: { $sum: '$coins' }
                    }
                }
            ];
            response = await paginationAggregate(model, $aggregate, $extra);
            // Rename the result field for consistency
            if (response.data.length > 0) {
                response.data[0].coins = response.data[0].totalCoins;
                delete response.data[0].totalCoins;
            } else {
                response.data.push({ coins: 0 });
            }
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