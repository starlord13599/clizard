const { read, write } = require('../../../fsm/files');

async function updateMiddleware(globalMiddlewares, functionSnippet, path) {
	const readData = await read(path).split('\n');

	let idx = readData.lastIndexOf('');

	for (const middleware of globalMiddlewares) {
		let updatedSnippet = functionSnippet.replace('test', middleware);
		readData.splice(idx - 1, 0, updatedSnippet);
	}

	const newData = readData.join('\n');
	await write(path, newData);
	return true;
}

module.exports = { updateMiddleware };
