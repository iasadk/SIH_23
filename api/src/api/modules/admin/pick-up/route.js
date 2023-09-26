const { Router } = require('express');
const controller = require('./controller');
const { validateToken } = require('../../../middlewares/auth');

const router = Router({ mergeParams: true });


router.get('/list'/*,validateToken*/, controller.list);
router.post('/save', validateToken, controller.save);
router.post('/delete', controller.delete);


module.exports = router;