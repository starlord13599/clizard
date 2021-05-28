const { writeJson } = require('fs-extra');
const path = require('path');
const {
	askMiddleware,
	promptOptionQuestion,
	propmtModuleQuestion,
	askEndpoint,
} = require('./src/askMiddleware');
const { updateMiddleware } = require('./src/updateGlobalMiddleware');

async function createMiddleware() {
	try {
		const option = await promptOptionQuestion();
		const { functionSnippet } = require(path.resolve(
			__dirname,
			'src',
			'assets',
			'snippets.json'
		));

		switch (option) {
			case 'module':
				let moduleName = await propmtModuleQuestion();
				let middlewares = await askMiddleware();
				let obtainedPath = path.resolve(
					'api',
					moduleName,
					'middleware',
					`${moduleName}.js`
				);
				let obtainedRoutePath = path.resolve('api', moduleName, 'routes.json');

				let routData = require(obtainedRoutePath);

				let endpoints = routData.map((m) => m.url);

				const endpoint = await askEndpoint(endpoints);

				let filteredRoute = routData.find((route) => route.url === endpoint);

				for (const middlewre of middlewares) {
					filteredRoute.middlewares.push(`${moduleName}.${middlewre}`);
				}

				await writeJson(obtainedRoutePath, routData, { spaces: 2 });
				await updateMiddleware(middlewares, functionSnippet, obtainedPath);

				break;

			default:
				let globalPath = path.resolve('middleware', 'globalMiddleware.js');
				let globalMiddlewares = await askMiddleware();
				await updateMiddleware(globalMiddlewares, functionSnippet, globalPath);

				break;
		}
	} catch (error) {
		throw error;
	}
}

module.exports = { createMiddleware };
