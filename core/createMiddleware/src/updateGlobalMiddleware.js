const { appendFile } = require('fs-extra');
const path = require('path');
const { trim } = require('lodash');

async function updateMiddleware(globalMiddlewares, functionSnippet, obtainedpath) {
	const readData = require(path.resolve(obtainedpath));

	let preparedMiddleware = Object.keys(readData);

	for (const middleware of globalMiddlewares) {
		if (!isPresent(middleware, preparedMiddleware)) {
			let updatedSnippet = functionSnippet.replace('test', middleware);
			await appendFile(obtainedpath, updatedSnippet);
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

module.exports = { updateMiddleware };
