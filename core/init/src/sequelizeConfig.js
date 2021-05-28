const path = require('path');
const { green, red } = require('chalk');
const { writeJson, readJson, pathExistsSync } = require('fs-extra');
const { shellCommand, abs } = require(path.join(__dirname, '../../../', 'helpers/helpers.js'));
const ora = require('ora');

//init all sequelize commands one-by-one
async function initSequelize(commands) {
	for (const command of commands) {
		await shellCommand(`npx sequelize init:${command}`, `Initializing Sequelize ${command}`);
	}
	return true;
}

//update the config/database.json file according to users need
async function updateConfig(result) {
	if (!pathExistsSync(await abs('./config/database.json'))) {
		console.log(red('Unable to find config/database.json file'));
		return false;
	}

	let config;
	const { environment, username, password, database } = result;

	config = await readJson('./config/database.json');

	let data = config[environment];
	if (data) {
		data.username = username;
		data.password = password;
		data.database = database;
	}

	await writeJson('./config/database.json', config, { spaces: 2 });
	console.log(green('Config file updated successfully'));

	return true;
}

async function createDatabase(isConfigured) {
	if (isConfigured) {
		await shellCommand('npx sequelize db:create', 'Creating database');
		return true;
	}

	ora('Environment set to null,Cannot create database').warn();
	return false;
}

module.exports = {
	updateConfig,
	createDatabase,
	initSequelize,
};
