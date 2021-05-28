const path = require('path');
const fs = require('fs-extra');

const { createFiles, createFolders } = require('./src/folderAndFile');
const { installPackages, initPackage } = require('./src/packages');
const { updateConfig, createDatabase, initSequelize } = require('./src/sequelizeConfig');
const { propmtQuestions, promptEnvironmentQuestion } = require('./src/question');

//asyncly runs all the functions
async function main({ configs, folders, files, nodeModules, commands, isConfigured }) {
	try {
		await createFolders(folders);
		await createFiles(files);
		await initPackage();
		await installPackages(nodeModules);
		await initSequelize(commands);
		await updateConfig(configs);
		await createDatabase(isConfigured);
		return true;
	} catch (error) {
		throw new Error(error);
	}
}

//clizard init
async function init() {
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

	const folders = await fs.readJSON(path.join(__dirname, 'src/assets/folders.json'));
	const files = await fs.readJSON(path.join(__dirname, 'src/assets/files.json'));
	const nodeModules = await fs.readJSON(path.join(__dirname, 'src/assets/nodeModules.json'));

	const commands = ['config', 'migrations', 'seeders', 'models'];

	return await main({
		configs: { environment, ...configs },
		folders,
		files,
		nodeModules,
		commands,
		isConfigured,
	});
}

module.exports = { init };
