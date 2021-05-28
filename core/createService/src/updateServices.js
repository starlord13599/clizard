const { appendFile } = require('fs-extra');
const { trim } = require('lodash');

async function updateServices(globalServices, functionSnippet, obtainedPath) {
	const readData = require(obtainedPath);

	const preparedServices = Object.keys(readData);

	for (const service of globalServices) {
		if (!isPresent(service, preparedServices)) {
			let updatedSnippet = functionSnippet.replace('test', service);
			await appendFile(obtainedPath, updatedSnippet);
		}
	}
	return true;
}

function isPresent(middleware, data) {
	for (const str of data) {
		if (trim(str) === trim(middleware)) {
			return true;
		}
	}
	return false;
}

module.exports = { updateServices };
