const { sequelize } = require('../db/models');

async function initializeDatabseConnection() {
	try {
		await sequelize.authenticate();
		return 'Database connection successfully established';
	} catch (error) {
		return 'something went wrong while connecting to database';
	}
}

module.exports = { initializeDatabseConnection };
