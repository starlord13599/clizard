const { walk } = require('../helpers/fsm/files');
const _ = require('lodash');
setup.functions = {};

async function walkFunctions() {
	const walked = await walk('./functions');

	for (const files of walked) {
		const requiredFile = require(files);
		_.merge(setup.functions, requiredFile);
	}

	return true;
}

module.exports = walkFunctions;
