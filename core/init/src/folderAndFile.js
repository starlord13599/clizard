const { checkExists } = require('../../../helpers/helpers');
const { mkdir, write, abs } = require('../../../fsm/files');
const { yellow, blue } = require('chalk');

//function to create folders && can written success message
async function createFolders(folders) {
	console.log(yellow('Creating folders ....'));

	for (const folder of folders) {
		if (await checkExists(folder.folderName)) {
			console.log(`Already Exists:-${await abs(folder.folderName)}`);
			continue;
		}

		let createdFolder = await mkdir(folder.folderName);
		console.log(`Created:- ${createdFolder}`);
	}

	console.log(blue('Folder creation completd'));

	return true;
}

//function to create files && can return success message
async function createFiles(files) {
	console.log(yellow('Writting files....'));

	for (const file of files) {
		let createdFile = await write(file.fileName, file.data);
		console.log(`Written file:- ${createdFile}`);
	}

	console.log(blue('File writing completd'));
	return true;
}

module.exports = { createFiles, createFolders };
