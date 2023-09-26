const jwt = require('jsonwebtoken');
const HttpStatus = require('http-status-codes');
const Response = require('../../utilities/Response');
const Message = require('../../utilities/Message');
const config = require('../../config');

module.exports = {

	setCuserInfo: async function (req, res, next) {
		try {
			const bearer = req.headers.authorization.split(" ");
			const token = bearer[1];
			const decode = jwt.verify(token, config.jwt.secretKey);

			const cuser = await userModel.findOne({ _id: decode.sub, isDeleted: false });
			req.__cuser = cuser;
			req.query.ln = cuser?.preferredLn || 'en';
		} catch (e) {} finally {
			next();
		}
	},


	validateToken: async function (req, res, next) {
		try {
			if (req.headers.authorization) {
				const authorization = req.headers.authorization.trim();

				if (authorization.startsWith('Bearer ')) {
					const bearer = req.headers.authorization.split(" ");
					const token = bearer[1];
					const decode = jwt.verify(token, config.jwt.secretKey);

					try {
						const cuser = await userModel.findOne({ _id: decode.sub, isDeleted: false });
						if (!cuser) {
							throw new Error();
						} else if (!cuser.status) {
							Response.fail(res, 'Account is blocked. Contact Admin!!', HttpStatus.StatusCodes.UNAUTHORIZED);
							return;
						}
						req.__cuser = cuser;
						req.query.ln = cuser?.preferredLn || 'en';
					} catch (e) {
						throw new Error();
					}

					next();
				} else {
					throw Response.createError(Message.invalidToken);
				}
			} else {
				throw new Error();
			}

		} catch (e) {
			Response.fail(res, 'Unauthorized! Try login again.', HttpStatus.StatusCodes.UNAUTHORIZED);
		}
	},


	checkPlanPurchased: async (req, res, next) => {
		try {
			if (req.__cuser.planPurchased) {
				next();
			} else {
				throw new Error();
			}
		} catch (e) {
			Response.fail(res, 'Plan not purchased', HttpStatus.StatusCodes.UNAUTHORIZED);
		}
	},

};