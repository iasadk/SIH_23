const service = require('../../../../services/location');
const Response = require('../../../../utilities/Response');
const Message = require('../../../../utilities/Message');

class controller {

	//Country Controller Functions: 
	static async list(req, res) {
		try {
			const response = { data: [], message: Message.noContent.message, code: Message.noContent.code, extra: {} };
			const srvRes = await service.list(req.query);

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
	static async save(req, res) {
		try {
			const response = { data: [], message: Message.internalServerError.message, code: Message.internalServerError.code };
			const srvRes = await service.save({ ...req.body });
			if (srvRes.status) {
				response.data = srvRes.data
				response.message = Message.dataSaved.message;
				response.code = Message.dataSaved.code;
			}
			Response.success(res, response);
		} catch (err) {
			Response.fail(res, Response.createError(Message.dataDeletionError, err));
		}
	}
	static async delete(req, res) {
		try {
			const response = { message: Message.dataDeletionError.message, code: Message.dataDeletionError.code };
			const srvRes = await service.delete(req.body.ids);
			if (srvRes.status) {
				response.message = Message.dataDeleted.message;
				response.code = Message.dataDeleted.code;
			}
			Response.success(res, response);
		} catch (err) {
			Response.fail(res, Response.createError(Message.dataDeletionError, err));
		}
	}

	//State Controller Functions:
	static async listState(req, res) {
		try {
			const response = { data: [], message: Message.noContent.message, code: Message.noContent.code, extra: {} };
			const srvRes = await service.listState(req.query);

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
	static async saveState(req, res) {
		try {
			const response = { data: [], message: Message.internalServerError.message, code: Message.internalServerError.code };
			const srvRes = await service.saveState({ ...req.body });
			if (srvRes.status) {
				response.data = srvRes.data
				response.message = Message.dataSaved.message;
				response.code = Message.dataSaved.code;
			}
			Response.success(res, response);
		} catch (err) {
			Response.fail(res, Response.createError(Message.dataDeletionError, err));
		}
	}
	static async deleteState(req, res) {
		try {
			const response = { message: Message.dataDeletionError.message, code: Message.dataDeletionError.code };
			const srvRes = await service.deleteState(req.body.ids);
			if (srvRes.status) {
				response.message = Message.dataDeleted.message;
				response.code = Message.dataDeleted.code;
			}
			Response.success(res, response);
		} catch (err) {
			Response.fail(res, Response.createError(Message.dataDeletionError, err));
		}
	}
 

	// Bulk Uplaod Function: 
	static async bulkUpload(req, res) {
		try {
			const response = { data: [], message: Message.internalServerError.message, code: Message.internalServerError.code };
			const srvRes = await service.bulkUpload({ ...req.body });
			if (srvRes.status) {
				response.data = srvRes.data
				response.message = Message.dataSaved.message;
				response.code = Message.dataSaved.code;
			}
			Response.success(res, response);
		} catch (err) {
			Response.fail(res, Response.createError(Message.dataDeletionError, err));
		}
	}

}

module.exports = controller;