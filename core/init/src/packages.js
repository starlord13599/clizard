const { shellCommand } = require('../../../helpers/helpers');

//function to install packages && can return success message
async function installPackages(nodeModules) {
	let allModules = nodeModules.join(' ');
	await shellCommand(`npm install --save ${allModules}`, 'Installing packages...');
	return true;
}

module.exports = { installPackages };
