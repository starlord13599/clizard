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
const { propmtQuestions } = require('./src/question');

//asyncly runs all the functions
async function main(configs, folders, files, nodeModules) {
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
		await createDatabase();
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

	configs = await propmtQuestions();
	return await main(configs, folders, files, nodeModules);
}

module.exports = { init };
