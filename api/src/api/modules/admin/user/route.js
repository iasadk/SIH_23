const { Router } = require('express');
const controller = require('./controller');
const validation = require('../../../middlewares/validation/admin');
const { validateToken, validateSuperAdmin, checkRight, checkRightSave, checkRightDelete, checkRightDetail } = require('../../../middlewares/auth');
const masterAdmin = require('../../../../models/user');

const router = Router({ mergeParams: true });

router.post('/login', validation.login, controller.login);
router.post('/validate-token', validateToken, controller.validateToken);
router.post('/update-password', validateToken, validation.updatePassword, controller.updatePassword);
router.get('/profile', validateToken, controller.profile);
router.post('/register',validation.userValidation, controller.saveProfile);
router.post('/change-avatar', validateToken, controller.changeAvatar);


///// Sub-Admin route
router.get('/list', validateToken, checkRight('super-admin-access-list'), controller.list);
router.post('/save', validateToken, checkRightSave('super-admin-access-add', 'super-admin-access-edit'), validation.subAdmin, controller.save);
router.post('/delete', validateToken, checkRightDelete('super-admin-access-delete'), controller.delete);


router.get('/init-admin', async (req, res) => {
    const docData = new masterAdmin();
    docData.firstName = 'Mukesh';
    docData.lastName = 'Jain';
    docData.email = 'admin@test.com';
    docData.phone = '8826648669';
    docData.password = 'admin';
    docData.type = 'superAdmin';
    await docData.save();

    res.send('success');
});

module.exports = router;