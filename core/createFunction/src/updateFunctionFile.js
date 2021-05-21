const { read, write } = require('../../../fsm/files');

//to append function snippets for functions
async function updateFunctionFile(functions, functionSnippet, moduleName) {
	if (functions.length === 0) {
		return false;
	}

	const readData = await read(`${process.cwd()}/api/${moduleName}/functions/${moduleName}.js`).split('\n');
	let idx = readData.lastIndexOf('');

	functions.forEach(async (func) => {
		let updatedSnippet = functionSnippet.replace('test', func);
		readData.splice(idx - 1, 0, updatedSnippet);
	});
	const newData = readData.join('\n');
	await write(`${process.cwd()}/api/${moduleName}/functions/${moduleName}.js`, newData);
	return true;
}

async function updateGlobalFunctionFile(functions, functionSnippet, path) {
	const readData = await read(path).split('\n');
	let idx = readData.lastIndexOf('');

	functions.forEach(async (func) => {
		if (readData.find((match) => match.includes(`${func}:`)) === undefined) {
			let updatedSnippet = functionSnippet.replace('test', func);
			readData.splice(idx - 1, 0, updatedSnippet);
		}
	});
	const newData = readData.join('\n');
	await write(path, newData);
	return true;
}

module.exports = { updateFunctionFile, updateGlobalFunctionFile };
