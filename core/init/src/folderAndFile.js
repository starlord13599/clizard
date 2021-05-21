const { checkExists } = require('../../../helpers/helpers');
const { mkdir, write, abs, copy, read } = require('../../../fsm/files');
const { yellow, green } = require('chalk');
const ora = require('ora');
const path = require('path');
//function to create folders && can written success message
async function createFolders(folders) {
	const spinner = ora(yellow('Creating Folders...\n\r')).start();

	for (const folder of folders) {
		const spinner2 = ora();
		if (await checkExists(folder.folderName)) {
			spinner2.text = `Already Exists:- ${await abs(folder.folderName)}`;
			spinner2.succeed();
			continue;
		}

		let createdFolder = await mkdir(folder.folderName);
		spinner2.text = `Folder created:- ${createdFolder}`;
		spinner2.succeed();
	}

	spinner.succeed(green('Folder creation completed'));

	return true;
}

//function to create files && can return success message
async function createFiles(files) {
	const spinner = ora(yellow('Writting files...\n\r')).start();

	for (const file of files) {
		const spinner2 = ora();
		const currentPath = path.resolve(__dirname, file.fromPath);
		let createdFile = await copy(currentPath, file.toPath);
		spinner2.text = `Written:- ${createdFile}`;
		spinner2.succeed();
	}

	spinner.succeed(green('Writting files completed'));
	return true;
}

module.exports = { createFiles, createFolders };
