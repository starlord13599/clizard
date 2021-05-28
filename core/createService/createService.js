const {
	promptGlobalServiceQuestion,
	promptOptionQuestion,
	propmtModuleQuestion,
} = require('./src/promptGlobalServiceQuestion');
const { updateServices } = require('./src/updateServices');
const path = require('path');
const { readJson } = require('fs-extra');

async function createService() {
	const option = await promptOptionQuestion();

	const { functionSnippet } = await readJson(path.resolve(__dirname, 'src/assets/snippets.json'));

	switch (option) {
		case 'module':
			let moduleName = await propmtModuleQuestion();
			let services = await promptGlobalServiceQuestion();
			let obtainedPath = path.resolve('api', moduleName, 'services', `${moduleName}.js`);
			await updateServices(services, functionSnippet, obtainedPath);
			break;

		default:
			let globalServices = await promptGlobalServiceQuestion();
			let globalPath = path.resolve('services/globalServices.js');
			await updateServices(globalServices, functionSnippet, globalPath);
			break;
	}
	return true;
}

module.exports = { createService };
