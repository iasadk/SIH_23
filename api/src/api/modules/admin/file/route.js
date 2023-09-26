const { Router } = require('express');
const controller = require('./controller');
const validation = require('../../../middlewares/validation/file');
const { formValidation } = require('../../../middlewares/others');
const multerUpload = require('../../../../utilities/multer')();
const { uploadFileBase64 } = require('../../../../utilities/Helper');

const router = Router({ mergeParams: true });

router.post('/save', multerUpload?.single('file'),controller.save);
router.post('/save-base64', validation.fileBase64, formValidation, uploadFileBase64, controller.save);
router.post('/remove', /* deleteFromAWS, */ controller.remove);

module.exports = router;