const { promptGlobalServiceQuestion } = require('./src/promptGlobalServiceQuestion');
const { updateServices } = require('./src/updateServices');

async function createGService() {
	const globalServices = await promptGlobalServiceQuestion();
	const { functionSnippet } = require('../../data/test.json');

	await updateServices(globalServices, functionSnippet);
	return true;
}

module.exports = { createGService };
