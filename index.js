#!/usr/bin/env node

const folders = require('./folders.json');
const files = require('./files.json');
const { green, yellow, blue } = require('chalk');
const { mkdir, write, exists } = require('./fsm/files');
const shell = require('shelljs');
const { Select, prompt } = require('enquirer');

const nodeModules = [ 'express', 'ejs', 'sequelize', 'express-ejs-layouts' ];

async function createFolders(folders) {
	console.log(yellow('Creating folders ....'));

	for (const folder of folders) {
		let createdFolder = await mkdir(folder.folderName);
		console.log(`Folder created - ${createdFolder}`);
	}
	console.log(blue('Folder creation completd'));

	return true;
}

async function createFiles(files) {
	console.log(yellow('Creating files....'));

	for (const file of files) {
		let createdFile = await write(file.fileName, file.data);
		console.log(`File created - ${createdFile}`);
	}

	console.log(blue('File creation completd'));
	return true;
}

async function installPackages(nodeModules) {
	let allModules = nodeModules.join(' ');
	console.log(`Installing packages ... ${nodeModules.join(',')}`);
	shell.exec(`npm install --save ${allModules}`);
	console.log(`Installing packages completed`);
	return true;
}

async function initSequelize() {
	console.log('Initializing Sequelize configuration');
	shell.exec(`npx sequelize init`);
	return true;
}

async function main() {
	await createFolders(folders);
	await createFiles(files);
	await installPackages(nodeModules);
	await initSequelize();
}

const prompt1 = new Select({
	name: 'Config',
	message: 'For what do you want to create this setup?',
	choices: [ 'development', 'production' ]
});

prompt1
	.run()
	.then(async (env) => {
		let environment = env;

		const prompt2 = await prompt([
			{
				type: 'input',
				name: 'dbUsername',
				message: 'Please provide databse username👱'
			},
			{
				type: 'input',
				name: 'dbPassword',
				message: 'Please provide databse password ✏'
			},
			{
				type: 'input',
				name: 'dbDatabaseName',
				message: 'Please provide databse name 📚'
			}
		]);

		prompt2.environment = environment;

		main()
			.then(async () => {
				// TODO: the database.json file created should be automatically updated with details taken from user

				console.log(green('Setup is ready'));
			})
			.catch((err) => {
				console.log(err);
			});
	})
	.catch(() => {});
