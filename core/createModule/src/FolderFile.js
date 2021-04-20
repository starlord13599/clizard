const ora = require('ora');
const { mkdir, exists, write } = require('../../../fsm/files');
const { checkExists } = require('../../../helpers/helpers');

//return the module folder created
async function createModule(apiDir, moduleName) {
	if (!await exists(apiDir)) {
		apiDir = await mkdir(apiDir);
	}

	let createdFolder;
	if (!await checkExists(`${apiDir}\\${moduleName}`)) {
		createdFolder = await mkdir(`${apiDir}\\${moduleName}`);
	}
	return createdFolder;
}

//for creating middleware,services,controller folders
async function createComponents(folder, moduleName) {
	try {
		if (!folder) {
			throw new Error('Module already exsist');
		}
		let components = [ 'middleware', 'controller', 'services', 'functions' ];
		let files = [ 'routes.json' ];
		const routesJson = require('../../../data/routes.json');
		let { data, SnippetWithoutNext } = require('../../../data/test.json');

		for (const component of components) {
			await mkdir(`${folder}\\${component}`);

			if (component === 'service' || component === 'functions') {
				data = `${SnippetWithoutNext}`;
			}

			await write(`${folder}\\${component}\\${moduleName}.js`, data);
		}

		for (const file of files) {
			await write(`${folder}\\${file}`, JSON.stringify(routesJson, null, 2));
		}
		return true;
	} catch (err) {
		throw err;
	}
}

module.exports = { createComponents, createModule };
