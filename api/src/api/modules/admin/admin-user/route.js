const { Router } = require('express');
const controller = require('./controller');

const router = Router({ mergeParams: true });



router.get('/list-user', controller.listUser);


module.exports = router;