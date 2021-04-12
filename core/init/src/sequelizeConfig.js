const shell = require('shelljs');
const { green, yellow } = require('chalk');
const { read, write } = require('../../../fsm/files');
const { checkExists } = require('../../../helpers/helpers');

//* OPTIMIZE THIS INTO ONE FUNCTION
//function to initailize config file
async function initConfig() {
	console.log(yellow('Initializing Sequelize configuration'));
	await shell.exec(`npx sequelize init:config`);
	return true;
}

//function to initailize migrations folder
async function initMigrations() {
	console.log(yellow('Initializing Sequelize migrations'));
	await shell.exec(`npx sequelize init:migrations`);
	return true;
}

//function to initialize seeders folder
async function initSeeders() {
	console.log(yellow('Initializing Sequelize Seeders'));
	await shell.exec(`npx sequelize init:seeders`);
	return true;
}

//function to initialize models folder
async function initModel() {
	console.log(yellow('Initializing Sequelize Models'));
	await shell.exec(`npx sequelize init:models`);
	return true;
}
//* /OPTIMIZE THIS INTO ONE FUNCTION

//update the config/database.json file according to users need
async function updateConfig(result) {
	let config;
	const { environment, username, password, database } = result;

	if (await checkExists('./config/database.json')) {
		config = JSON.parse(await read('./config/database.json'));

		let data = config[environment];
		if (data !== undefined) {
			data.username = username;
			data.password = password;
			data.database = database;
		}

		await write('./config/database.json', JSON.stringify(config, null, 2));
		console.log(green('Config file updated successfully'));
	}
	return true;
}

module.exports = { updateConfig, initConfig, initMigrations, initModel, initSeeders };
