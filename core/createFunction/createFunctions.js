const { write, list, name } = require('../../fsm/files');
const { checkExists } = require('../../helpers/helpers');
const {
	propmtPathQuestion,
	propmtModuleQuestion,
	promptOptionQuestion,
	promptFunctionNameQuestion
} = require('./src/propmtPathQuestion');
const { updateFunctionFile, updateGlobalFunctionFile } = require('./src/updateFunctionFile');

async function createFunction() {
	try {
		const option = await promptOptionQuestion();
		const { funcWithoutNext, SnippetWithoutNext } = require('../../data/test.json');

		switch (option) {
			case 'module':
				let moduleName = await propmtModuleQuestion();
				let functionNames = await promptFunctionNameQuestion();
				await updateFunctionFile(functionNames, funcWithoutNext, moduleName);
				break;

			default:
				const path = await propmtPathQuestion();
				const globalFunctionNames = await promptFunctionNameQuestion();
				let newPath = `./functions/${path.join('/')}.js`;

				if (!await checkExists(newPath)) {
					await write(newPath, SnippetWithoutNext);
				}
				await updateGlobalFunctionFile(globalFunctionNames, funcWithoutNext, newPath);
				break;
		}
	} catch (err) {
		throw err;
	}
}

module.exports = { createFunction };
