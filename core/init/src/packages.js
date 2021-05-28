const path = require('path');
const { shellCommand } = require(path.join(__dirname, '../../../', 'helpers/helpers.js'));

//function to install packages && can return success message
async function installPackages(nodeModules) {
	let allModules = nodeModules.join(' ');
	await shellCommand(`npm install --save ${allModules}`, 'Installing packages...');
	return true;
}

async function initPackage() {
	await shellCommand('npm init -y', 'Initializing Package');
}

module.exports = { installPackages, initPackage };
