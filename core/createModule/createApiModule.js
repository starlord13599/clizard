const { propmtQuestion, getApiDir } = require('./src/promptQuestion');
const { createModule, createComponents } = require('./src/FolderFile');

async function createApiModule(moduleName) {
	try {
		if (!moduleName) throw new Error('An module name is required'); // throw err if no arguments provided

		const resp = await propmtQuestion(); //ask the user which folder you want to create module

		const apiDir = getApiDir(resp.dir); //prepare api directory
		const createdModule = await createModule(apiDir, moduleName); //calling createModule Function

		return await createComponents(createdModule, moduleName); //creating sub folders
	} catch (err) {
		throw err;
	}
}

module.exports = { createApiModule };
