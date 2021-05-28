const { pathExistsSync, ensureDir, writeFile, writeJson } = require('fs-extra');

//return the module folder created
async function createModule(apiDir, moduleName) {
	if (!(await pathExistsSync(apiDir))) {
		apiDir = await ensureDir(apiDir);
	}

	let createdFolder;

	if (!(await pathExistsSync(`${apiDir}/${moduleName}`))) {
		createdFolder = await ensureDir(`${apiDir}/${moduleName}`);
	}
	return createdFolder;
}

//for creating middleware,services,controller folders
async function createComponents(folder, moduleName) {
	try {
		if (!folder) {
			throw new Error('Module already exsist');
		}

		let components = ['middleware', 'controller', 'services', 'functions'];

		let { SnippetWithNext, SnippetWithoutNext } = require('./assets/snippets.json');

		for (const component of components) {
			await ensureDir(`${folder}/${component}`);

			let snippet = SnippetWithNext;

			if (component === 'service' || component === 'functions') {
				snippet = SnippetWithoutNext;
			}

			await writeFile(`${folder}/${component}/${moduleName}.js`, snippet);
		}

		await writeJson(`${folder}/routes.json`, []);

		return true;
	} catch (err) {
		throw err;
	}
}

module.exports = { createComponents, createModule };
