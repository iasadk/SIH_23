const { Router } = require('express');
const controller = require('./controller');
const { validateToken, validateSuperAdmin, checkRight, checkRightSave, checkRightDelete, checkRightDetail } = require('../../../middlewares/auth');
const { countryValidation, stateValidation, getJSONData } = require('../../../middlewares/validation/location');
// const { validateModuleSave, validateModule } = require('../../../middlewares/auth');

const router = Router({ mergeParams: true });


router.get('/country/list', validateToken,/* checkRight('super-admin-access-list')*/ controller.list);
router.post('/country/save', validateToken/* checkRightSave('super-admin-access-add', 'super-admin-access-edit')*/, countryValidation, controller.save);
router.post('/country/delete', validateToken,/* checkRightDelete('super-admin-access-list')*/ controller.delete);

router.get('/state/list', validateToken/* checkRight('super-admin-access-list')*/, controller.listState);
router.post('/state/save', validateToken/* checkRightSave('super-admin-access-add', 'super-admin-access-edit')*/, stateValidation, controller.saveState);
router.post('/state/delete', validateToken/* checkRightDelete('super-admin-access-list')*/, controller.deleteState);

router.post('/bulk-upload', validateToken/* checkRightDelete('super-admin-access-list')*/, getJSONData, controller.bulkUpload);

module.exports = router;