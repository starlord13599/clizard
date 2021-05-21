const { createFiles, createFolders } = require('./src/folderAndFile');
const { installPackages, initPackage } = require('./src/packages');
const {
	updateConfig,
	initConfig,
	initMigrations,
	initModel,
	initSeeders,
	createDatabase
} = require('./src/sequelizeConfig');
const { propmtQuestions, promptEnvironmentQuestion } = require('./src/question');

//asyncly runs all the functions
async function main(configs, folders, files, nodeModules, isConfigured) {
	try {
		await createFolders(folders);
		await createFiles(files);
		await initPackage();
		await installPackages(nodeModules);
		await initConfig();
		await initMigrations();
		await initSeeders();
		await initModel();
		await updateConfig(configs);
		await createDatabase(isConfigured);
		return true;
	} catch (error) {
		throw new Error(error);
	}
}

//clizard init
async function init() {
	const folders = require('../../data/folders.json');
	const files = require('../../data/files.json');
	const nodeModules = [
		'sequelize',
		'enquirer',
		'express',
		'ejs',
		'express-ejs-layouts',
		'morgan',
		'multer',
		'chalk',
		'dotenv',
		'mysql2',
		'umzug',
		'portastic',
		'swear',
		'atocha',
		'lodash',
		'node-cron'
	];

	const environment = await promptEnvironmentQuestion();
	let configs;
	let isConfigured;
	switch (environment) {
		case 'development':
		case 'production':
			configs = await propmtQuestions();
			isConfigured = true;
			break;

		default:
			isConfigured = false;
			break;
	}

	return await main({ environment, ...configs }, folders, files, nodeModules, isConfigured);
}

module.exports = { init };
