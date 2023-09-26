const adminService = require('../../../../services/admin');
const Response = require('../../../../utilities/Response');
const Message = require('../../../../utilities/Message');

class controller {
    static async login(req, res) {


        try {
            const response = { data: [], message: Message.noContent.message, code: Message.noContent.code, extra: {} };
            const srvRes = await adminService.login({ code: req.body.code, password: req.body.password });

            if (srvRes.status) {
                response.data = srvRes.data;
                response.message = 'Loggedin successfully';
                response.code = 200;
            }

            response.extra = srvRes.extra;
            Response.success(res, response);
        } catch (err) {
            Response.fail(res, Response.createError(Message.dataFetchingError, err));
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
            const srvRes = await adminService.updatePassword({ ...req.body, _id: req.__cuser._id });
            Response.success(res, srvRes);
        } catch (e) {
            Response.fail(res, e);
        }
    }
    static async profile(req, res) {
        try {
            const srvRes = await adminService.profile(req.__cuser);
            Response.success(res, srvRes);
        } catch (e) {
            Response.fail(res, e);
        }
    }
    static async saveProfile(req, res) {
        try {
            const srvRes = await adminService.saveProfile(req.body, req.__cuser);
            Response.success(res, srvRes);
        } catch (e) {
            Response.fail(res, e);
        }
    }
}

module.exports = controller;