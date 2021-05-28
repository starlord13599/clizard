const path = require('path');
const { appendFile, pathExistsSync, access } = require('fs-extra');
const { trim } = require('lodash');

//to append function snippets for functions
async function updateFunctionFile(functions, functionSnippet, moduleName) {
	if (functions.length === 0) {
		return false;
	}

	let readData = require(path.resolve('api', moduleName, 'functions', `${moduleName}.js`));

	let preparedFunctions = Object.keys(readData);

	functions.forEach(async (func) => {
		if (!isPresent(func, preparedFunctions)) {
			let updatedSnippet = functionSnippet.replace('test', func);

			await appendFile(
				path.resolve('api', moduleName, 'functions', `${moduleName}.js`),
				updatedSnippet
			);
		}
	});
	return true;
}

async function updateGlobalFunctionFile(functions, functionSnippet, obtainedPath) {
	let preparedFunctions;
	let readData = require(path.resolve(obtainedPath));
	preparedFunctions = Object.keys(readData);

	functions.forEach(async (func) => {
		if (!isPresent(func, preparedFunctions)) {
			let updatedSnippet = functionSnippet.replace('test', func);
			await appendFile(path.resolve(obtainedPath), updatedSnippet);
		}
	});
	return true;
}

function isPresent(middleware, data) {
	if (!middleware) {
		return false;
	}

	if (!data) {
		return false;
	}

	return data.some((str) => trim(str) === trim(middleware));
}

async function checkPath(p) {
	try {
		await access(path.resolve(p));
		return true;
	} catch (err) {
		return false;
	}
}

module.exports = { updateFunctionFile, updateGlobalFunctionFile, checkPath };
