const path = require('path');
const { readdir } = require('fs-extra');

//function to return all folders present in api folder
async function generateFolderNames() {
	try {
		const folders = await readdir(path.resolve('api'));

		if (folders.length === 0) {
			throw new Error('No module found');
		}
		return folders;
	} catch (error) {
		throw error;
	}
}

//generate local middlewares
function generateMiddleware(middlewares, moduleName = 'middleware') {
	if (middlewares.length === 0) {
		return middlewares;
	}

	const newMiddlewares = middlewares.map((middleware) => {
		return `${moduleName}.${middleware}`;
	});

	return newMiddlewares;
}

//generate controller name
function generateController(controller, moduleName) {
	return `${moduleName}.${controller}`;
}

module.exports = { generateController, generateFolderNames, generateMiddleware };
