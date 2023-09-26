const userService = require('../../../../services/user');
const Response = require('../../../../utilities/Response');
const Message = require('../../../../utilities/Message');
class controller {

	static async detailsUser(req, res) {
		try {
			const response = { data: {}, message: Message.noContent.message, code: Message.noContent.code, extra: {} };
			const srvRes = await userService.detailsUser(req.params._id);

			if (srvRes.data?._id) {
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

	static async listUser(req, res) {
		try {
			const response = { data: [], message: Message.noContent.message, code: Message.noContent.code, extra: {} };
			const srvRes = await userService.list(req.query);
			
			if(srvRes.data.length){
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

	static async saveUser(req, res) {
		try {
			const response = {message: Message.internalServerError.message, code: Message.internalServerError.code};
			const srvRes = await userService.saveUser({ ...req.body });
			if(srvRes.status){
				response.message = Message.dataSaved.message;
				response.code = Message.dataSaved.code;
			}
			Response.success(res, response);
		} catch (err) {
			Response.fail(res, Response.createError(Message.dataDeletionError, err));
		}
	}

	static async deleteUser(req, res) {
		try {
			const response = {message: Message.dataDeletionError.message, code: Message.dataDeletionError.code};
			const srvRes = await userService.deleteUser(req.body.ids);
			if(srvRes.status){
				response.message = Message.dataDeleted.message;
				response.code = Message.dataDeleted.code;
			}
			Response.success(res, response);
		} catch (err) {
			Response.fail(res, Response.createError(Message.dataDeletionError, err));
		}
	}
}

module.exports = controller