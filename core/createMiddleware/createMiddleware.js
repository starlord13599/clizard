const { abs, write } = require('../../fsm/files');
const { askMiddleware, promptOptionQuestion, propmtModuleQuestion, askEndpoint } = require('./src/askMiddleware');
const { updateMiddleware } = require('./src/updateGlobalMiddleware');

async function createMiddleware() {
	try {
		const option = await promptOptionQuestion();
		const { functionSnippet } = require('../../data/test.json');

		switch (option) {
			case 'module':
				let moduleName = await propmtModuleQuestion();
				let middlewares = await askMiddleware();
				let path = `./api/${moduleName}/middleware/${moduleName}.js`;
				let routePath = `./api/${moduleName}/routes.json`;
				let routData = require(await abs(routePath));

				let endpoints = routData.map((m) => m.url);

				const endpoint = await askEndpoint(endpoints);

				let filteredRoute = routData.find((route) => route.url === endpoint);
				for (const middlewre of middlewares) {
					filteredRoute.middlewares.push(`${moduleName}.${middlewre}`);
				}

				await write(await abs(routePath), JSON.stringify(routData, null, 2));
				await updateMiddleware(middlewares, functionSnippet, path);

				break;

			default:
				let globalPath = `./middleware/globalMiddleware.js`;
				let globalMiddlewares = await askMiddleware();
				await updateMiddleware(globalMiddlewares, functionSnippet, globalPath);

				break;
		}
	} catch (error) {
		throw error;
	}
}

module.exports = { createMiddleware };
