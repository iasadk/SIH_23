const { check } = require('express-validator');
const { formValidation } = require('../others');
const axios = require("axios");
const HttpStatus = require('http-status-codes');
const Response = require('../../../utilities/Response');
const validations = {
    countryValidation: [
        check('name')
            .notEmpty().withMessage('Name is required'),
        check('code')
            .notEmpty().withMessage('Code is required'),
        formValidation
    ],

    stateValidation: [
        check('countryId')
            .notEmpty().withMessage('Country Id is required'),
        check('name')
            .notEmpty().withMessage('Name is required'),
        check('code')
            .notEmpty().withMessage('Code is required'),
        formValidation

    ],

    getJSONData: async (req, res, next) => {
        try {
            const response = await axios.get(req?.body?.url);
            if (response.status === 200) {
                req.body.data = response.data;
                next();
            } else {
                throw new Error('Failed to fetch data from URL');
            }

        } catch (e) {
            console.log(e)
            Response.fail(res, 'Failed to fetch data from URL', HttpStatus.StatusCodes.UNAUTHORIZED);
        }
    },
}

module.exports = validations;