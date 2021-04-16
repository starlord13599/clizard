const { exists, write } = require('../../fsm/files');
const { overwritePrompt, generateData } = require('./src/promptQuestion');
const { updateControllerFile, updateMiddlewareFile, updateGlobalMiddleware } = require('./src/updaters');

async function createApi() {
	try {
		// destructure from generateData()
		const { data, moduleName } = await generateData();

		//check if all values obtained successfully
		if (!data || !moduleName) {
			throw `Process ended unexpectedly`;
		}
		//check if the routes.json file is present in specified module
		if (!await exists(`${process.cwd()}/api/${moduleName}/routes.json`)) {
			throw `Routes.json not found in ${moduleName}`;
		}

		//storing values of routes.json file into a variable
		const routeData = require(`${process.cwd()}/api/${moduleName}/routes.json`);

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
				// push data in routeData
				routeData.push(data);
				//storing the function snippet in variable
				const { functionSnippet, controllerSnippet } = require('../../data/test.json');
				//creating/updating middleware
				updateMiddlewareFile(data, functionSnippet, moduleName);
				//creating/updating controller
				updateControllerFile(data, controllerSnippet, moduleName);
				//creating/updating globalMiddleware
				updateGlobalMiddleware(data, functionSnippet);
				break;
		}

		await write(`${process.cwd()}/api/${moduleName}/routes.json`, JSON.stringify(routeData, null, 2));

		return true;
	} catch (err) {
		throw err;
	}
}

module.exports = { createApi };
