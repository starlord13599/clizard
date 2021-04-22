const { walk, write, mkdir, remove } = require('../helpers/fsm/files');
const fs = require('fs');
const { appendFile } = fs.promises;
const { existsSync } = fs;

async function readRoutesFile() {
	return await walk(`${process.cwd()}/api`).filter((file) => {
		let matching = /\.json$/;
		return matching.test(file);
	});
}

function generateApiBlock(method, url, moduleName) {
	return `
    /**
     * @api {${method}} ${url}
     * @apiGroup ${moduleName}
     *
    */
    `;
}

async function generateApiDoc() {
	const routesPath = await readRoutesFile();

	let routesData = [];
	for (const path of routesPath) {
		let data = require(path);
		routesData = [ ...routesData, ...data ];
	}

	if (existsSync('./apidocs/src/docs.js')) {
		await remove('./apidocs/src/docs.js');
	}

	for (const route of routesData) {
		let moduleName = route.controller.split('.')[0];
		let { method, url } = route;
		let commentBlock = generateApiBlock(method, url, moduleName);

		await appendFile('./apidocs/src/docs.js', commentBlock);
	}
	return true;
}

generateApiDoc();
