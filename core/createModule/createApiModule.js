const { propmtQuestion } = require('./src/promptQuestion');
const { createModule, createComponents } = require('./src/FolderFile');

//returns a string which contains the path in which the module should create
function getApiDir(pars = 'api') {
	if (!pars) {
		pars = 'api';
	}
	return `${process.cwd()}/${pars}`;
}

async function createApiModule(moduleName) {
	try {
		if (!moduleName) throw new Error('An module name is required'); // throw err if no arguments provided

		const { dir } = await propmtQuestion(); //ask the user which folder you want to create module

		const apiDir = getApiDir(dir); //prepare api directory
		const createdModule = await createModule(apiDir, moduleName); //calling createModule Function

		return await createComponents(createdModule, moduleName); //creating sub folders
	} catch (err) {
		throw err;
	}
}

module.exports = { createApiModule };
