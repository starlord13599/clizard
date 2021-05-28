// const { exists, write } = require('../../fsm/files');
const path = require('path');
const { existsSync, readJson, writeJson } = require('fs-extra');
const { overwritePrompt, generateData } = require('./src/promptQuestion');
const {
	updateControllerFile,
	updateMiddlewareFile,
	updateGlobalMiddleware,
} = require('./src/updaters');

async function createApi() {
	try {
		// destructure from generateData()
		const { data, moduleName } = await generateData();

		//check if all values obtained successfully
		if (!data || !moduleName) {
			throw `Process ended unexpectedly`;
		}
		//check if the routes.json file is present in specified module
		if (!existsSync(`${process.cwd()}/api/${moduleName}/routes.json`)) {
			throw `Routes.json not found in ${moduleName}`;
		}

		//storing values of routes.json file into a variable
		const routeData = await readJson(`${process.cwd()}/api/${moduleName}/routes.json`);

		//check if already exsist and ask user what to do (update or create new)
		const found = routeData.find((el) => el.url === data.url && el.method === data.method);

		let answer;
		if (found) {
			answer = await overwritePrompt();
		}

		//update or create according to users need
		switch (answer) {
			case true:
				//update the routeData
				Object.assign(found, data);
				break;

			default:
				routeData.push(data); // push data in routeData
				const { functionSnippet, controllerSnippet } = await readJson(
					path.join(__dirname, 'src/assets/snippets.json')
				); //storing the function snippet in variable
				await updateMiddlewareFile(data, functionSnippet, moduleName); //creating/updating middleware
				await updateControllerFile(data, controllerSnippet, moduleName); //creating/updating controller
				await updateGlobalMiddleware(data, functionSnippet); //creating/updating globalMiddleware
				break;
		}

		await writeJson(path.resolve('api', moduleName, 'routes.json'), routeData, { spaces: 2 });

		return true;
	} catch (err) {
		throw err;
	}
}

module.exports = { createApi };
