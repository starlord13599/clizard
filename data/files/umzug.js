const { sequelize, Sequelize } = require('../db/models');
const Umzug = require('umzug');
const path = require('path');

const umzug = new Umzug({
	migrations: {
		path: path.join(__dirname, '../db/migrations'),
		params: [ sequelize.getQueryInterface(), Sequelize ]
	},

	storage: 'sequelize',
	storageOptions: {
		sequelize: sequelize
	}
});

module.exports = { umzug };
