const { list, walk } = require('../helpers/fsm/files');
const _ = require('lodash');
setup.moduleFunctions = {};

async function walkModuleFunctions() {
	let folders = await list('./api');

	let filePaths = [];
	for (const folder of folders) {
		let folderName = await walk(`${folder}/functions`);
		filePaths = [ ...filePaths, ...folderName ];
	}

	for (const filePath of filePaths) {
		let reqFile = require(filePath);
		_.merge(setup.moduleFunctions, reqFile);
	}
}

module.exports = walkModuleFunctions;
