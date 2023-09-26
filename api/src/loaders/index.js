const expressLoader = require('./express');
const schedule = require('./schedule');
const Logger = require('../utilities/Logger');
const mongoose = require('./mongoose');
const socketLoader = require('./socketio');

require('./lodash');

const loader = async function ({ expressApp, server }) {
	await mongoose();
	Logger.info('✌️ DB loaded and connected!');

	await schedule.init();
	Logger.info('✌️ Scheduler Running');

	console.log("Socket Connected !!")
	await socketLoader({ server });
	
	await expressLoader({ app: expressApp });
	Logger.info('✌️ Express loaded');

	


};

module.exports = loader;