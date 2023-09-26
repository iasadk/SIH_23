const { Types } = require('mongoose');
const countryModel = require('../models/country');
const stateModel = require('../models/state');
const { clearSearch } = require('../utilities/Helper');
const { paginationAggregate } = require('../utilities/pagination');
const io = require("socket.io-client");
const { performance } = require('perf_hooks');

class locationService {

    // Country Functions: 
    static async list(query = {}) {
        const $extra = { page: query.page, limit: query.limit, isAll: query.isAll, total: query.total, getTotal: query.getTotal  };
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

        try {
            const docData = _id ? await countryModel.findById(_id) : new countryModel();

            docData.name = data.name;
            docData.code = data.code;
            docData.currency = data.currency;
            docData.currency_symbol = data.currency_symbol;
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

    // State Functions: 
    static async listState(query = {}) {
        const $extra = { page: query.page, limit: query.limit, isAll: query.isAll, total: query.total, getTotal: query.getTotal  };
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
                countryId: query?.countryId ? Array.isArray(query.countryId) ? { $in: query.countryId.map(v => Types.ObjectId(v)) } : Types.ObjectId(query.countryId) : '',
                isDeleted: false
            };

            clearSearch(search);
            const $aggregate = [
                { $match: search },
                { $sort: { name: 1 } },
                {
                    $lookup: {
                        from: 'countries',
                        localField: 'countryId',
                        foreignField: '_id',
                        as: 'countryDetail',
                        pipeline: [
                            {
                                $project: {
                                    name: 1
                                }
                            }
                        ]

                    }
                },
                { $unwind: { path: "$countryDetail", preserveNullAndEmptyArrays: true } },
                {
                    $project: {
                        name: 1,
                        countryName: '$countryDetail.name',
                        code: 1,
                        rightGrpId: 1
                    }
                },
            ];
            response = await paginationAggregate(stateModel, $aggregate, $extra);
            response.status = true;
            return response;
        } catch (err) {
            throw err;
        }
    }
    static async saveState(data) {
        const _id = data._id;
        const response = { data: {}, status: false };

        try {
            const docData = _id ? await stateModel.findById(_id) : new stateModel();

            docData.countryId = data.countryId;
            docData.name = data.name;
            docData.code = data.code;
            await docData.save();

            response.data = docData;
            response.status = true;

            return response;

        } catch (err) {
            throw err;
        }
    }
    static async deleteState(ids) {
        const response = { status: false, ids: [] };
        try {

            if (Array.isArray(ids)) {
                await stateModel.updateMany({ _id: { $in: ids } }, { isDeleted: true });
            } else if (typeof ids === 'string') {
                await stateModel.updateOne({ _id: ids }, { isDeleted: true });
                response.id = ids
            }

            response.status = true;
            response.ids = ids;

            return response;
        } catch (err) {
            throw err;
        }
    }
    // Bulk Upload Handeler: 
    static async bulkUpload({ data }) {
        const socket = io.connect(process.env.APPLICATION_API_BASE_URL);
        const response = { data: {}, status: false };
        const totalItems = data.length; // Total number of items to process
        let processedItems = 0;
        let startTime = performance.now();

        try {
            // Map through the coming JSON Data of countries and state:
            for (const v of data) {
                // Now check if country already added or not:
                const countryData = await countryModel.findOne({ name: v?.name, isDeleted: false });
                if (!countryData?._id) { // if country not exist
                    const savedCountry = await countryModel.create({ name: v?.name, code: v?.iso3, currency: v?.currency, currency_symbol: v?.currency_symbol });
                    await savedCountry.save();

                    // after saving the country then add all it's state
                    for (const state of v?.states) {
                        const savedState = await stateModel.create({ countryId: savedCountry?._id, name: state?.name, code: state?.state_code });
                        await savedState.save();
                    }

                } else {
                    // if the country already exisit then only check the states
                    for (const state of v?.states) {
                        const stateData = await stateModel.findOne({ countryId: Types.ObjectId(countryData?._id), name: state?.name, isDeleted: false });
                        if (!stateData?._id) {
                            const savedState = await stateModel.create({ countryId: savedCountry?._id, name: state?.name, code: state?.state_code });
                            await savedState.save();
                        }
                    }

                }
                processedItems++;

                // Calculate progress percentage
                const progressPercentage = (processedItems / totalItems) * 100;

                // Calculating estimated time remaining
                const currentTime = performance.now();
                const elapsedMilliseconds = currentTime - startTime;
                const estimatedTimeRemaining = (elapsedMilliseconds / processedItems) * (totalItems - processedItems) / 60000;
                console.log(`Progress: ${progressPercentage.toFixed(2)}% and estimated time: ${estimatedTimeRemaining.toFixed(0)}`);
                try {
                    socket.emit("bulk-uploading", { progressPercentage: progressPercentage.toFixed(2), estimatedTimeRemaining: estimatedTimeRemaining.toFixed(0), isUploading: true })
                } catch (error) {
                    console.log("Bulk Uploading Socket Error: ", error.message)
                }
            }
            socket.emit("bulk-uploading", { progressPercentage: 100, estimatedTimeRemaining: 0, isUploading: false })
            response.data = { msg: "Bulk Upload Successfull." }
            response.status = true;

            return response;

        } catch (err) {
            throw err;
        }
    }

}

module.exports = locationService;