const { prompt } = require('enquirer');

//prompt question
async function propmtQuestion() {
	const response = await prompt({
		type: 'input',
		name: 'dir',
		message: 'What folder do you want to create this module?(default:api)'
	});

	return response;
}

//returns a string which contains the path in which the module should create
function getApiDir(pars) {
	if (!pars) {
		pars = 'api';
	}

	return `${process.cwd()}\\${pars}`;
}

module.exports = { getApiDir, propmtQuestion };
