const { read, write } = require('../../../fsm/files');

async function updateServices(globalServices, functionSnippet, path) {
	const readData = await read(path).split('\n');

	let idx = readData.lastIndexOf('');

	for (const service of globalServices) {
		if (readData.find((match) => match.includes(`${service}:`)) === undefined) {
			let updatedSnippet = functionSnippet.replace('test', service);
			readData.splice(idx - 1, 0, updatedSnippet);
		}
	}

	const newData = readData.join('\n');
	await write(path, newData);
	return true;
}

module.exports = { updateServices };
