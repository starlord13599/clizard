const { appendFile } = require('fs').promises;
const { read, write } = require('../../../fsm/files');

//to append function snippets for middleware
async function updateMiddlewareFile({ middlewares }, functionSnippet, moduleName) {
	if (middlewares.length === 0) {
		return false;
	}

	const readData = await read(`${process.cwd()}/api/${moduleName}/middleware/${moduleName}.js`).split('\n');
	let idx = readData.lastIndexOf('');

	middlewares.forEach(async (middleware) => {
		const splited = middleware.split('.')[1];
		let updatedSnippet = functionSnippet.replace('test', splited);
		readData.splice(idx - 1, 0, updatedSnippet);
	});
	const newData = readData.join('\n');
	await write(`${process.cwd()}/api/${moduleName}/middleware/${moduleName}.js`, newData);
	return true;
}

//to append function snippets for controller
async function updateControllerFile({ controller }, functionSnippet, moduleName) {
	if (controller === undefined) {
		return false;
	}

	const readData = await read(`${process.cwd()}/api/${moduleName}/controller/${moduleName}.js`).split('\n');
	let idx = readData.lastIndexOf('');
	const splited = controller.split('.')[1];

	let updatedSnippet = functionSnippet.replace('test', splited);
	readData.splice(idx - 1, 0, updatedSnippet);

	const newData = readData.join('\n');
	await write(`${process.cwd()}/api/${moduleName}/controller/${moduleName}.js`, newData);

	return true;
}

async function updateGlobalMiddleware({ globalMiddlewares }, functionSnippet) {
	const readData = await read(`${process.cwd()}/middleware/globalMiddleware.js`).split('\n');

	let idx = readData.lastIndexOf('');
	globalMiddlewares.forEach(async (middleware) => {
		// const splited = middleware.split('.')[1];
		let updatedSnippet = functionSnippet.replace('test', middleware);
		readData.splice(idx - 1, 0, updatedSnippet);
	});
	const newData = readData.join('\n');
	await write(`${process.cwd()}/middleware/globalMiddleware.js`, newData);
	return true;
}

module.exports = { updateControllerFile, updateMiddlewareFile, updateGlobalMiddleware };
