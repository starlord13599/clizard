const shell = require('shelljs');
const { green, yellow } = require('chalk');
const { read, write } = require('../../../fsm/files');
const { checkExists, shellCommand } = require('../../../helpers/helpers');
const ora = require('ora');

//* OPTIMIZE THIS INTO ONE FUNCTION
//function to initailize config file
async function initConfig() {
	await shellCommand('npx sequelize init:config', 'Initializing Sequelize configuration');
	return true;
}

//function to initailize migrations folder
async function initMigrations() {
	await shellCommand('npx sequelize init:migrations', 'Initializing Sequelize migrations');
	return true;
}

//function to initialize seeders folder
async function initSeeders() {
	await shellCommand('npx sequelize init:seeders', 'Initializing Sequelize seeders');
	return true;
}

//function to initialize models folder
async function initModel() {
	await shellCommand('npx sequelize init:models', 'Initializing Sequelize model');
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

module.exports = { updateConfig, initConfig, initMigrations, initModel, createDatabase, initSeeders };
