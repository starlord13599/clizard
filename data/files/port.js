const portastic = require('portastic');

async function findFreePort() {
	const freePort = await portastic.find({
		min: 3000,
		max: 3010
	});

	return freePort[0];
}

module.exports = { findFreePort };
