#!/usr/bin/env node

const folders = require('./folders.json');
const files = require('./files.json');
const { green, yellow, blue } = require('chalk');
const { mkdir, write, exists, read } = require('./fsm/files');
const shell = require('shelljs');
const { prompt } = require('enquirer');

//to be installed modules from npm registry
const nodeModules = [ 'sequelize', 'express', 'ejs', 'express-ejs-layouts' ];

//function to create folders
async function createFolders(folders) {
	console.log(yellow('Creating folders ....'));

	for (const folder of folders) {
		let createdFolder = await mkdir(folder.folderName);
		console.log(`Folder created - ${createdFolder}`);
	}
	console.log(blue('Folder creation completd'));

	return true;
}

//function to create files
async function createFiles(files) {
	console.log(yellow('Creating files....'));

	for (const file of files) {
		let createdFile = await write(file.fileName, file.data);
		console.log(`File created - ${createdFile}`);
	}

	console.log(blue('File creation completd'));
	return true;
}

//function to install packages
async function installPackages(nodeModules) {
	let allModules = nodeModules.join(' ');
	console.log(`Installing packages ... ${nodeModules.join(',')}`);
	shell.exec(`npm install --save ${allModules}`);
	console.log(`Installing packages completed`);
	return true;
}

//function to initailize config file
async function initConfig() {
	console.log('Initializing Sequelize configuration');
	await shell.exec(`npx sequelize init:config`);
	return true;
}

//function to initailize migrations folder
async function initMigrations() {
	console.log('Initializing Sequelize migrations');
	await shell.exec(`npx sequelize init:migrations`);
	return true;
}

//function to initialize seeders folder
async function initSeeders() {
	console.log('Initializing Sequelize Seeders');
	await shell.exec(`npx sequelize init:seeders`);
	return true;
}

//function to initialize models folder
async function initModel() {
	console.log('Initializing Sequelize Seeders');
	await shell.exec(`npx sequelize init:models`);
	return true;
}

//update the config/database.json file according to users need
async function updateConfig(result) {
	let config;
	const { environment, username, password, database } = result;
	if (await exists('./config/database.json')) {
		config = JSON.parse(await read('./config/database.json'));

		let data = config[environment];
		data.username = username;
		data.password = password;
		data.database = database;

		await write('./config/database.json', JSON.stringify(config));
		console.log('Config file updated successfully');
	}
	return true;
}

//asyncly runs all the functions
async function main(result) {
	await createFolders(folders);
	await createFiles(files);
	await installPackages(nodeModules);
	await initConfig();
	await initMigrations();
	await initSeeders();
	await initModel();
	await updateConfig(result);
	return true;
}

//prompts user with questions
async function propmtQuestions() {
	const data = await prompt([
		{
			type: 'input',
			name: 'environment',
			message: 'Do you want to run in development or production environment?'
		},
		{
			type: 'input',
			name: 'username',
			message: 'Please provide databse username👱'
		},
		{
			type: 'input',
			name: 'password',
			message: 'Please provide databse password ✏'
		},
		{
			type: 'input',
			name: 'database',
			message: 'Please provide databse name 📚'
		}
	]);
	return data;
}

//the file runns from here
propmtQuestions()
	.then((result) => {
		main(result)
			.then(() => {
				console.log(green('Setup is ready'));
			})
			.catch((err) => {
				console.log(err);
			});
	})
	.catch((err) => {
		console.log(err);
	});
