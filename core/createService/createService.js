const {
	promptGlobalServiceQuestion,
	promptOptionQuestion,
	propmtModuleQuestion
} = require('./src/promptGlobalServiceQuestion');
const { updateServices } = require('./src/updateServices');

async function createService() {
	const option = await promptOptionQuestion();
	const { functionSnippet } = require('../../data/test.json');

	switch (option) {
		case 'module':
			let moduleName = await propmtModuleQuestion();
			let services = await promptGlobalServiceQuestion();
			let path = `./api/${moduleName}/services/${moduleName}.js`;
			await updateServices(services, functionSnippet, path);
			break;

		default:
			let globalServices = await promptGlobalServiceQuestion();
			let globalPath = `./services/globalServices.js`;
			await updateServices(globalServices, functionSnippet, globalPath);
			break;
	}
	return true;
}

module.exports = { createService };
