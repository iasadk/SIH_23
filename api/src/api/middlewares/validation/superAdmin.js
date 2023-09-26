const { check } = require('express-validator');
const { Types } = require("mongoose");
const rightModel = require('../../../models/right');
const rightGrpModel = require('../../../models/rightGroup');
const { formValidation } = require('../others');
const { clearSearch } = require('../../../utilities/Helper');

const validations = {
    rightGroupValidation: [
       
        check('name')
            .notEmpty().withMessage('Name is required'),
        formValidation
    ],

    rightValidation: [
       
        check('name')
            .notEmpty().withMessage('Name is required'),
        check("code")
            .notEmpty().withMessage("Code is required.")
            .isSlug().withMessage("Provide a valid code.")
            .custom(async (value, { req }) => {
                const body = req.body;
                const search = {
                    _id: { $ne: Types.ObjectId(body._id) }
                    , code: value
                };
                clearSearch(search);
                const result = await rightModel.find({ ...search });
                console.log("this is rels",result)
                if (result?.length) {
                    throw new Error("This code is already used for a right.");
                }
            }),
        check('rightGrpId')
            .notEmpty().withMessage('Please select Right'),
        formValidation
    ],
    roleValidation: [
       
        check('name')
            .notEmpty().withMessage('Name is Required.'),
        check('rightCodes')
            .notEmpty().withMessage('Right Codes are Required.'),
        formValidation
    ],

}

module.exports = validations;