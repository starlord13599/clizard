const { mkdir, exists, write } = require('../../../fsm/files');
const { checkExists } = require('../../../helpers/helpers');

//return the module folder created
async function createModule(apiDir, moduleName) {
	if (!await exists(apiDir)) {
		apiDir = await mkdir(apiDir);
	}

	let createdFolder;
	if (!await checkExists(`${apiDir}\\${moduleName}`)) {
		createdFolder = await mkdir(`${apiDir}\\${moduleName}`);
	}
	console.log(createdFolder ? `Module ${moduleName} created` : `Module ${moduleName} already exists`);
	return createdFolder;
}

//for creating middleware,services,controller folders
async function createComponents(folder) {
	let components = [ 'middleware', 'controller', 'service' ];
	let files = [ 'routes.json' ];
	const routesJson = require('../../../data/routes.json');
	const { data } = require('../../../data/test.json');

	for (const component of components) {
		await mkdir(`${folder}\\${component}`);
		await write(`${folder}\\${component}\\test.js`, data);
	}

	for (const file of files) {
		await write(`${folder}\\${file}`, JSON.stringify(routesJson, null, 2));
	}
	return true;
}

module.exports = { createComponents, createModule };
