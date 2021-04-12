const { propmtQuestion, getApiDir } = require('./src/promptQuestion');
const { createModule, createComponents } = require('./src/FolderFile');

async function createApiModule(moduleName) {
	// const arg = process.argv.slice(2)[0]; //return element from index 2

	if (!moduleName) throw 'An module name is required'; // throw err if no arguments provided

	const resp = await propmtQuestion(); //ask the user which folder you want to create module

	const apiDir = getApiDir(resp.dir); //prepare api directory
	const createdModule = await createModule(apiDir, moduleName); //calling createModule Function

	return await createComponents(createdModule); //creating sub folders
}

module.exports = { createApiModule };
