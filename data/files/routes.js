const { walk } = require('../helpers/fsm/files');

async function readRoutesFile() {
	return await walk(`${process.cwd()}/api`).filter((file) => {
		let matching = /\.json$/;
		return matching.test(file);
	});
}

async function getAllRoutes() {
	const allRoutes = await readRoutesFile();
	let routesData = [];

	for (const route of allRoutes) {
		const routes = require(route);
		routesData = [ ...routesData, ...routes ];
	}

	for (const route of routesData) {
		route.middlewares = route.middlewares.map((m) => m.split('.')[1]);
		route.middlewares = route.middlewares.map((m) => {
			let requiredMiddleware = require(route.middlewarePath);
			return requiredMiddleware[m];
		});
	}

	for (const route of routesData) {
		route.controller = route.controller.split('.')[1];
		let requiredController = require(route.controllerPath);
		route.controller = requiredController[route.controller];
	}

	return routesData;
}

module.exports = { getAllRoutes };
