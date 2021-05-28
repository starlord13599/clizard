const path = require('path');
const { pathExistsSync, writeFile, readJson, ensureDir } = require('fs-extra');
const {
	propmtPathQuestion,
	propmtModuleQuestion,
	promptOptionQuestion,
	promptFunctionNameQuestion,
} = require('./src/propmtPathQuestion');
const {
	updateFunctionFile,
	updateGlobalFunctionFile,
	checkPath,
} = require('./src/updateFunctionFile');

async function createFunction() {
	try {
		const option = await promptOptionQuestion();
		const { functionSnippet } = await readJson(
			path.join(__dirname, 'src', 'assets', 'snippets.json')
		);

		switch (option) {
			case 'module':
				let moduleName = await propmtModuleQuestion();
				let functionNames = await promptFunctionNameQuestion();
				await updateFunctionFile(functionNames, functionSnippet, moduleName);
				break;

			default:
				const obtainedPath = await propmtPathQuestion();
				const globalFunctionNames = await promptFunctionNameQuestion();
				let newPath = path.resolve('functions', `${obtainedPath.join('/')}.js`);

				if (!(await checkPath(newPath))) {
					ensureDir(path.dirname(newPath));
					await writeFile(newPath, functionSnippet);
				}

				await updateGlobalFunctionFile(globalFunctionNames, functionSnippet, newPath);
				break;
		}
	} catch (err) {
		throw err;
	}
}

module.exports = { createFunction };
