const Response = require('../utilities/Response');
const Logger = require('../utilities/Logger');
const { validateToken } = require('./middlewares/auth');
const { validateToken: validateTokenFront, setCuserInfo: setCuserInfoFront } = require('./middlewares/authFront');


const adminRoute = require("./modules/admin/user/route");
const adminUserRoute = require("./modules/admin/admin-user/route");
const adminAdminRoute = require("./modules/admin/admin/route");
const adminLocationRoute = require("./modules/admin/location/route");
const fileRoute = require('./modules/admin/file/route');
const facilityRoute = require('./modules/admin/facilities/route');
const pickUpRoute = require('./modules/admin/pick-up/route');
const adminPickUpRoute = require('./modules/admin/admin-pick-up/route');
const userCreditPoint = require('./modules/admin/creditPoints/route');

const api = (app) => {
    app.use('*', (req, res, next) => {
        res.set({
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        });
        if (req.method === 'OPTIONS') {
            res.status(200).json({ status: 'Okay' });
        } else {
            next();
        }
    });

    app.all('/status', (req, res) => {
        Logger.info('checking status', { status: 1 });

        Response.success(res, {
            data: {
                headers: req.headers,
                params: req.params,
                query: req.query,
                body: req.body,
            },
        });
    });

    app.all('/validate-token', validateToken, (req, res) => {
        Response.success(res, {
            data: { type: req.__cuser.type, adminRights: req.__cuser.adminRights, name: req.__cuser.name, avatar: req.__cuser.avatar },
            message: "Authorized"
        });
    });
    
    /*
    |--------------------------------------------------------------------------
    |  Admin Urls
    |--------------------------------------------------------------------------
    */
   app.use('/ewaste', facilityRoute);
    app.use('/file', /* validateToken, */ fileRoute);
    app.use('/user', adminRoute);
    app.use('/admin/user', adminUserRoute);
    app.use('/pick-up', pickUpRoute);
    app.use('/admin', adminAdminRoute);
    app.use('/admin/user', adminAdminRoute);
    app.use('/admin/pick-up', adminPickUpRoute);
    app.use('/location', validateToken, adminLocationRoute);
    // app.use('/team-user', validateToken, adminTeamUserRoute);
    app.use('/credit-point', validateToken, userCreditPoint);

};

module.exports = api;