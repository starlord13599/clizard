const { Select, Input, List, Toggle } = require('enquirer');
const { generateController, generateFolderNames, generateMiddleware } = require('./generaters');

//overwrite? propmt
async function overwritePrompt() {
	const overWrite = await new Toggle({
		message: 'The above details already exsists in routes.json do you want to overwrite or create new?',
		enabled: 'Overwrite',
		disabled: 'New'
	}).run();

	return overWrite;
}

//taking values form user
async function generateData() {
	try {
		const moduleName = await new Select({
			name: 'folder',
			message: 'Pick a module',
			choices: await generateFolderNames()
		}).run();

		const methodName = await new Select({
			name: 'method',
			message: 'Pick a method',
			choices: [ 'get', 'post', 'put', 'patch', 'delete' ]
		}).run();

		const controllerName = await new Input({
			message: 'Enter name of your Action name'
		}).run();

		const middlewares = await new List({
			name: 'middleware',
			message: 'Enter the middleware you want to create(comma seperated)'
		}).run();

		const globalMiddlewares = await new List({
			name: 'middleware',
			message: 'Enter the global middleware you want to create(comma seperated)'
		}).run();

		const endPoint = await new Input({
			message: 'Enter name the endpoint name'
		}).run();

		const pathFromRoot = await new Toggle({
			message: 'Do you want the path from root?',
			enabled: 'Yes',
			disabled: 'No'
		}).run();

		return {
			data: {
				method: methodName,
				url: endPoint,
				globalMiddlewares: globalMiddlewares,
				middlewares: generateMiddleware(middlewares, moduleName),
				controller: generateController(controllerName, moduleName),
				pathFromRoot: pathFromRoot,
				middlewarePath: `../api/${moduleName}/middleware/${moduleName}.js`,
				controllerPath: `../api/${moduleName}/controller/${moduleName}.js`
			},
			moduleName
		};
	} catch (err) {
		throw err;
	}
}

module.exports = { overwritePrompt, generateData };
