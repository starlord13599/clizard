const fs = require('fs');
const path = require('path');
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

const join = (...parts) => abs(path.join(...parts));

// Retrieve the full, absolute path for the path
const abs = async (name = '.', base = process.cwd()) => {
	name = await name;
	base = await base;

	// Absolute paths do not need more absolutism
	if (path.isAbsolute(name)) return name;

	// We are off-base here; recover the viable base option
	if (!base || typeof base !== 'string') {
		base = process.cwd();
	}

	// Return the file/folder within the base
	return join(base, name);
};

module.exports = { checkExists, shellCommand, abs };
