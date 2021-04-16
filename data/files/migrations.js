const { umzug } = require('../core/umzug.js');
const { Toggle } = require('enquirer');
const { logQuery } = require('../helpers/loggingQuery');

async function checkPendingMigrations() {
	const logDatabaseQuery = await new Toggle({
		message: 'Do you want to log database query into a file?',
		enabled: 'Yes',
		disabled: 'No'
	}).run();

	umzug.options.storageOptions.sequelize.options.logging = false;
	if (logDatabaseQuery) {
		umzug.options.storageOptions.sequelize.options.logging = logQuery;
	}

	const migrations = await umzug.pending();

	if (migrations.length == 0) return 'true';

	if (migrations.length > 0) {
		const answer = await new Toggle({
			message: 'Migrations pending..wanna migrate?',
			enabled: 'Yes',
			disabled: 'No'
		}).run();

		if (!answer) throw 'Please complete the migrations first';

		return await umzug.up();
	}
}

module.exports = { checkPendingMigrations };
