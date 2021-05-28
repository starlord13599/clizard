const path = require('path');
const { appendFile } = require('fs-extra');
const { trim } = require('lodash');
//TODO Make sure to reuse object on nxt improvement

//to append function snippets for middleware
async function updateMiddlewareFile({ middlewares }, functionSnippet, moduleName) {
	if (middlewares.length === 0) {
		return false;
	}

	const readData = require(path.resolve('api', moduleName, 'middleware', `${moduleName}.js`));

	let preparedMiddlewares = Object.keys(readData);

	middlewares.forEach(async (middleware) => {
		const splited = middleware.split('.')[1];

		if (!isPresent(splited, preparedMiddlewares)) {
			console.log('inside middleware');

			let updatedSnippet = functionSnippet.replace('test', splited);

			await appendFile(
				path.resolve('api', moduleName, 'middleware', `${moduleName}.js`),
				updatedSnippet
			);
		}
	});
	return true;
}

//to append function snippets for controller
async function updateControllerFile({ controller }, functionSnippet, moduleName) {
	if (!controller) {
		return false;
	}

	const readData = require(path.resolve('api', moduleName, 'controller', `${moduleName}.js`));

	let preparedController = Object.keys(readData);

	const splited = controller.split('.')[1];

	if (!isPresent(splited, preparedController)) {
		let updatedSnippet = functionSnippet.replace('test', splited);
		console.log('inside controller');

		await appendFile(
			path.resolve('api', moduleName, 'controller', `${moduleName}.js`),
			updatedSnippet
		);
	}

	return true;
}

async function updateGlobalMiddleware({ globalMiddlewares }, functionSnippet) {
	const readData = require(path.resolve('middleware/globalMiddleware.js'), {});

	let preparedGlobalMiddlewares = Object.keys(readData);

	globalMiddlewares.forEach(async (middleware) => {
		if (!isPresent(middleware, preparedGlobalMiddlewares)) {
			console.log('inside global middleware');

			let updatedSnippet = functionSnippet.replace('test', middleware);
			await appendFile(path.resolve('middleware/globalMiddleware.js'), updatedSnippet);
		}
	});

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

module.exports = { updateControllerFile, updateMiddlewareFile, updateGlobalMiddleware };
