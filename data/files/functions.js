const { walk } = require('../helpers/fsm/files');
const _ = require('lodash');

async function walkFunctions() {
	const walked = await walk('./functions');

	for (const files of walked) {
		const requiredFile = require(files);
		_.merge(setup, requiredFile);
	}

	return true;
}

module.exports = walkFunctions;
