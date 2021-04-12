const { list, name } = require('../../../fsm/files');

//function to return all folders present in api folder
async function generateFolderNames() {
	const folders = await list('api');
	const folderName = folders.map(async (folder) => await name(folder));
	return folderName;
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
