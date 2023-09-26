const HttpStatus = require('http-status-codes');

module.exports = {
	accountBlocked: {
		name: 'Authorization error',
		message: 'Your account is blocked. Contact Admin!!',
		code: HttpStatus.StatusCodes.BAD_REQUEST
	},
	accountInactive: {
		name: 'Authorization error',
		message: 'Your account is inactive. Contact Admin',
		code: HttpStatus.StatusCodes.BAD_REQUEST
	},
	otpExpired: {
		name: 'Authorization error',
		message: 'OTP expired',
		code: HttpStatus.StatusCodes.BAD_REQUEST
	},
	invalidToken: {
		name: 'Authorization error',
		message: 'Invalid token',
		code: HttpStatus.StatusCodes.UNAUTHORIZED
	},
	profileUpdateError: {
		name: 'Profile updation error',
		message: 'Error while updating profile',
		code: HttpStatus.StatusCodes.NOT_IMPLEMENTED
	},
	profileUpdate: {
		name: 'Profile updation success',
		message: 'Profile updated',
		code: HttpStatus.StatusCodes.OK
	},

	dataFound: {
		name: 'Data found',
		message: 'Data fetched',
		code: HttpStatus.StatusCodes.OK
	},

	noContent: {
		name: 'Data not found',
		message: 'Data not found',
		code: HttpStatus.StatusCodes.OK
	},

	dataSaved: {
		message: 'Data saved successfully',
		code: HttpStatus.StatusCodes.OK
	},

	fileUploaded: {
		message: 'File uploaded successfully',
		code: HttpStatus.StatusCodes.OK
	},

	dataDeleted: {
		message: 'Data deleted successfully',
		code: HttpStatus.StatusCodes.OK
	},

	dataFetchingError: {
		name: 'Error while data fetchinh',
		message: 'Internal server error',
		code: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR
	},

	dataSavingError: {
		name: 'Error while saving data',
		message: 'Internal server error',
		code: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR
	},

	dataDeletionError: {
		name: 'Error while deleting data',
		message: 'Internal server error',
		code: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR
	},
	infoSaved: {
		name: 'Info saved',
		message: 'Info saved',
		code: HttpStatus.StatusCodes.OK
	},

	internalServerError: {
		name: 'Internal server error',
		message: 'Internal server error',
		code: HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR
	},

	dataNotFound: {
		name: 'Data not found',
		message: 'Data not found',
		code: HttpStatus.StatusCodes.NOT_FOUND
	},
	badRequest: {
		name: 'Bad Request',
		message: 'Bad Request',
		code: HttpStatus.StatusCodes.BAD_REQUEST
	},
	validationError: {
		name: 'Validation Error',
		message: 'Request Body Validation failed.',
		code: HttpStatus.StatusCodes.BAD_REQUEST
	},
	otpSent: {
		name: 'OtpSent',
		message: 'Otp sent',
		code: HttpStatus.StatusCodes.OK
	},
	otpValidateLogin: {
		name: 'otpValidateLogin',
		message: 'Otp Validate Successfully',
		code: HttpStatus.StatusCodes.OK
	},

	alreadySaved: {
		message: "Already Saved!",
		code: HttpStatus.StatusCodes.BAD_REQUEST
	},
	unSaved: {
		message: " Unsaved successfully",
		code: HttpStatus.StatusCodes.OK
	},
	disLiked: {
		message: " Disliked successfully",
		code: HttpStatus.StatusCodes.OK
	},
	msgOk: {
		message: "ok",
		code: HttpStatus.StatusCodes.OK
	}

}