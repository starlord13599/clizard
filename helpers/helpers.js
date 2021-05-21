const fs = require('fs');
const { abs } = require('../fsm/files');
const ora = require('ora');
const { spawn } = require('child_process');

async function checkExists(path) {
	if (fs.existsSync(await abs(path))) {
		return true;
	}
	return false;
}

function shellCommand(command, mssge = 'Processing...') {
	return new Promise((resolve, reject) => {
		const spinner = ora(mssge).start();
		const shellprocess = spawn(command, { shell: true });

		shellprocess.on('error', () => {
			spinner.fail();
			reject();
		});

		shellprocess.on('exit', () => {
			spinner.succeed();
			resolve();
		});
	});
}

module.exports = { checkExists, shellCommand };
