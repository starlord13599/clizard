const { yellow, blue } = require('chalk');
const shell = require('shelljs');
const ora = require('ora');

//function to install packages && can return success message
async function installPackages(nodeModules) {
	let allModules = nodeModules.join(' ');
	console.log(yellow(`Installing packages ... ${nodeModules.join(',')}`));

	await shell.exec(`npm install --save ${allModules}`);

	console.log(blue(`Installing packages completed`));
	return true;
}

module.exports = { installPackages };
