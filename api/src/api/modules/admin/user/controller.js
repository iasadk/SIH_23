const service = require('../../../../services/user');
const Response = require('../../../../utilities/Response');
const Message = require('../../../../utilities/Message');

class controller {
	static async login(req, res) {


		try {
			const response = { data: [], message: Message.noContent.message, code: Message.noContent.code, extra: {} };
			const srvRes = await service.login({ email: req.body.email, password: req.body.password });

			if (srvRes.status) {
				response.data = srvRes.data;
				response.message = 'Loggedin successfully';
				response.code = 200;
			}

			response.extra = srvRes.extra;
			Response.success(res, response);
		} catch (err) {
			// Response.fail(res, Response.createError(Message.dataFetchingError, err));
			Response.fail(res, err);
		}
	}
	static async validateToken(req, res) {
		try {
			Response.success(res, { message: 'Authorized', data: { type: req.__cuser.type } });
		} catch (e) {
			Response.fail(res, e);
		}
	}
	static async updatePassword(req, res) {
		try {
			const srvRes = await service.updatePassword({ ...req.body, _id: req.__cuser._id });
			Response.success(res, srvRes);
		} catch (e) {
			Response.fail(res, e);
		}
	}
	static async profile(req, res) {
		try {
			const srvRes = await service.profile(req.__cuser);
			Response.success(res, srvRes);
		} catch (e) {
			Response.fail(res, e);
		}
	}
	static async trackWasteOrder(req, res) {
		try {
			const srvRes = await service.trackWasteOrder(req.__cuser);
			Response.success(res, srvRes);
		} catch (e) {
			Response.fail(res, e);
		}
	}
	static async trackWasteHistory(req, res) {
		try {
			const srvRes = await service.trackWasteHistory(req.__cuser);
			Response.success(res, srvRes);
		} catch (e) {
			Response.fail(res, e);
		}
	}
	static async saveProfile(req, res) {
		try {
			const srvRes = await service.save(req.body);
			Response.success(res, srvRes);
		} catch (e) {
			Response.fail(res, e);
		}
	}

	static async changeAvatar(req, res) {
		try {
			const srvRes = await service.changeAvatar({ ...req.body, adminId: req.__cuser._id });
			Response.success(res, srvRes);
		} catch (e) {
			Response.fail(res, e);
		}
	}

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
			const response = { message: Message.internalServerError.message, code: Message.internalServerError.code };
			const srvRes = await service.save({ ...req.body });
			if (srvRes.status) {
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

	
}

module.exports = controller;