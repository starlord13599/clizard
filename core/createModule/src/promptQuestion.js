const { prompt } = require('enquirer');

//prompt question
async function propmtQuestion() {
	const response = await prompt({
		type: 'input',
		name: 'dir',
		message: 'What folder do you want to create this module? (default:api)',
	});

	return response;
}

module.exports = { propmtQuestion };
