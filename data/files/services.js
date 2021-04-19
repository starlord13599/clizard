const { walk, name } = require('../helpers/fsm/files');
const _ = require('lodash');
setup.services = {};

async function walkServices() {
	const servicesPath = await walk('./services');

	for (const path of servicesPath) {
		let fileName = await name(path).split('.')[0];
		let reqServices = require(path);
		if (setup.services[fileName] === undefined) setup.services[fileName] = {};
		_.merge(setup.services[fileName], reqServices);
	}
}

module.exports = walkServices;
