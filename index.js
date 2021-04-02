#!/usr/bin/env node

const folders = require('./folders.json');
const files = require('./files.json');
const { green, yellow, blue } = require('chalk');
const { mkdir, write } = require('./fsm/files');

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

async function main() {
	await createFolders(folders);
	await createFiles(files);
}

main()
	.then(() => {
		console.log(green('Setup is ready'));
	})
	.catch((err) => {
		console.log(err);
	});
