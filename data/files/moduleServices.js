const { list, walk, name } = require('../helpers/fsm/files');
const _ = require('lodash');
setup.moduleServices = {};

async function walkModuleServices() {
	const moduleFolders = await list('./api');

	let filePaths = [];
	for (const folder of moduleFolders) {
		let files = await walk(`${folder}/services`);
		filePaths = [ ...filePaths, ...files ];
	}

	for (const filePath of filePaths) {
		let fileName = await name(filePath).split('.')[0];

		let reqFile = require(filePath);

		if (setup.moduleServices[fileName] === undefined) setup.moduleServices[fileName] = {};
		_.merge(setup.moduleServices[fileName], reqFile);
	}
	return true;
}

module.exports = walkModuleServices;
