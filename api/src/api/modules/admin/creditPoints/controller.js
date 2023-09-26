const service = require('../../../../services/creditPoints');
const Response = require('../../../../utilities/Response');
const Message = require('../../../../utilities/Message');

class controller {

	static async list(req, res) {
		try {
			const response = { data: [], message: Message.noContent.message, code: Message.noContent.code, extra: {} };
			const srvRes = await service.list({...req.query, userId: req.__cuser._id});

			if (srvRes.data.length) {
				response.data = srvRes.data;
				response.message = Message.dataFound.message;
				response.code = Message.dataFound.code;
			}

			response.extra = srvRes.extra;
			Response.success(res, response);
		} catch (err) {
			Response.fail(res, Response.createError(Message.dataFetchingError, err));
		}
	}

}

module.exports = controller;