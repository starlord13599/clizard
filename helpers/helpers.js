const fs = require('fs');
const { abs } = require('../fsm/files');

async function checkExists(path) {
	if (fs.existsSync(await abs(path))) {
		return true;
	}
	return false;
}

module.exports = { checkExists };
