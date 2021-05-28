const path = require('path');
const { checkExists, abs } = require(path.join(__dirname, '../../../', 'helpers/helpers.js'));

const { ensureDir, pathExistsSync, copy } = require('fs-extra');
const { yellow, green } = require('chalk');
const ora = require('ora');

//function to create folders && can written success message
async function createFolders(folders) {
	const spinner = ora(yellow('Creating Folders...\n\r')).start();

	try {
		for (const folder of folders) {
			let { folderName } = folder;
			const spinner2 = ora();

			if (pathExistsSync(await abs(folderName))) {
				spinner2.text = `Already Exists:- ${await abs(folderName)}`;
				spinner2.succeed();
				continue;
			}

			let createdFolder = await ensureDir(folderName);

			spinner2.text = `Folder created:- ${createdFolder}`;
			spinner2.succeed();
		}

		spinner.succeed(green('Folder creation completed'));

		return true;
	} catch (error) {
		spinner.fail(error.message);
		console.log(error); //!To be removed
	}
}

//function to create files && can return success message
async function createFiles(files) {
	const spinner = ora(yellow('Writting files...\n\r')).start();

	try {
		for (const file of files) {
			let { fromPath, toPath } = file;

			const spinner2 = ora();

			const currentPath = path.resolve(__dirname, fromPath);
			await copy(currentPath, toPath);

			spinner2.text = `Written:- ${await abs(toPath)}`;
			spinner2.succeed();
		}

		spinner.succeed(green('Writting files completed'));
		return true;
	} catch (error) {
		spinner.fail(error.message);
		console.log(error); //!remove this
	}
}

module.exports = { createFiles, createFolders };
