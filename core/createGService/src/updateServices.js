const { read, write } = require('../../../fsm/files');

async function updateServices(globalServices, functionSnippet) {
	const readData = await read(`${process.cwd()}/services/globalServices.js`).split('\n');

	let idx = readData.lastIndexOf('');

	for (const service of globalServices) {
		let updatedSnippet = functionSnippet.replace('test', service);
		readData.splice(idx - 1, 0, updatedSnippet);
	}

	const newData = readData.join('\n');
	await write(`${process.cwd()}/services/globalServices.js`, newData);
	return true;
}

module.exports = { updateServices };
