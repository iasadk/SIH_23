const { Router } = require('express');
const controller = require('./controller');
const validation = require('../../../middlewares/validation/admin');
const { validateToken } = require('../../../middlewares/authAdmin');
const masterAdmin = require('../../../../models/admin');

const router = Router({ mergeParams: true });

router.post('/login', validation.login, controller.login);
router.post('/validate-token', validateToken, controller.validateToken);
router.post('/update-password', validateToken, validation.updatePassword, controller.updatePassword);
router.get('/profile', validateToken, controller.profile);
router.post('/save-profile', validateToken, controller.saveProfile);



router.get('/init-admin', async (req, res) => {
    const docData = new masterAdmin();
    docData.name = 'Sonu Kumar';
    docData.userName = 'admin';
    docData.email = 'admin';
    docData.phone = '9931006211';
    docData.password = 'admin';
    await docData.save();

    res.send('success');
});

module.exports = router;