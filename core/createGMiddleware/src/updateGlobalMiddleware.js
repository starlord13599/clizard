const { read, write } = require('../../../fsm/files');

async function updateGlobalMiddleware(globalMiddlewares, functionSnippet) {
	const readData = await read(`${process.cwd()}/middleware/globalMiddleware.js`).split('\n');

	let idx = readData.lastIndexOf('');

	for (const middleware of globalMiddlewares) {
		let updatedSnippet = functionSnippet.replace('test', middleware);
		readData.splice(idx - 1, 0, updatedSnippet);
	}

	const newData = readData.join('\n');
	await write(`${process.cwd()}/middleware/globalMiddleware.js`, newData);
	return true;
}

module.exports = { updateGlobalMiddleware };
