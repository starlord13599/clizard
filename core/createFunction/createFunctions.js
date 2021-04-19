const { write } = require('../../fsm/files');
const { checkExists } = require('../../helpers/helpers');
const { propmtPathQuestion } = require('./src/propmtPathQuestion');

async function createFunction() {
	try {
		const path = await propmtPathQuestion();
		let newPath = `./functions/${path.join('/')}.js`;

		if (await checkExists(newPath)) {
			throw new Error('the file already exsists');
		}

		let { simpleFunctionSnippet, forFunctionComment } = require('../../data/test.json');

		let value = {};
		let nestedObj = path.reduceRight((value, path) => ({ [path]: value }), value);
		let moduleExport = `module.exports = ${JSON.stringify(nestedObj)}`;

		await write(newPath, `${simpleFunctionSnippet}${forFunctionComment}${moduleExport}`);
	} catch (err) {
		throw err;
	}
}

module.exports = { createFunction };
