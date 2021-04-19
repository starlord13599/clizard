const { askGMiddleware } = require('./src/askGMiddleware');
const { updateGlobalMiddleware } = require('./src/updateGlobalMiddleware');

async function createGMiddleware() {
	try {
		const globalMiddlewares = await askGMiddleware();
		const { functionSnippet } = require('../../data/test.json');

		await updateGlobalMiddleware(globalMiddlewares, functionSnippet);
		return true;
	} catch (error) {
		throw error;
	}
}

module.exports = { createGMiddleware };
