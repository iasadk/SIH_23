const { Types } = require('mongoose');
const countryModel = require('../models/country');
const stateModel = require('../models/state');
const { clearSearch, getGeoCoordinates } = require('../utilities/Helper');
const { paginationAggregate } = require('../utilities/pagination');
const io = require("socket.io-client");
const { performance } = require('perf_hooks');

class locationService {

    static async list(query = {}) {
        const $extra = { page: query.page, limit: query.limit, isAll: query.isAll, total: query.total, getTotal: query.getTotal };
        let response = { data: [], extra: { ...$extra }, status: false };

        try {
            const search = {
                _id: query._id ? Array.isArray(query._id) ? query._id?.map(v => Types.ObjectId(v)) : Types.ObjectId(query._id) : '',
                $or: [
                    {
                        name: { '$regex': new RegExp(query.key || ''), $options: 'i' }
                    },
                    {
                        code: { '$regex': new RegExp(query.key || ''), $options: 'i' }
                    },
                ],
                isDeleted: false
            };

            clearSearch(search);

            const $aggregate = [
                { $match: search },
                { $sort: { name: 1 } },
                {
                    $project: {
                        name: 1,
                        code: 1,
                        currency: 1,
                        currency_symbol: 1
                    }
                },
            ];
            response = await paginationAggregate(countryModel, $aggregate, $extra);
            response.status = true;
            return response;
        } catch (err) {
            throw err;
        }
    }
    static async save(data) {
        const _id = data._id;
        const response = { data: {}, status: false };
      
        response.data = data
        response.status = true;

        return response;

    }
    static async delete(ids) {
        const response = { status: false, ids: [] };
        try {

            if (Array.isArray(ids)) {
                await countryModel.updateMany({ _id: { $in: ids } }, { isDeleted: true });
                await stateModel.updateMany({ countryId: { $in: ids } }, { isDeleted: true })
            } else if (typeof ids === 'string') {
                await countryModel.updateOne({ _id: ids }, { isDeleted: true });
                await stateModel.updateOne({ countryId: ids }, { isDeleted: true });
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

module.exports = locationService;