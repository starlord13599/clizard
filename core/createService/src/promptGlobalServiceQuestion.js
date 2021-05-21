const { List, Select } = require('enquirer');
const { generateFolderNames } = require('./generateFolderName');

async function promptOptionQuestion() {
	const option = await new Select({
		name: 'option',
		message: 'On what level you want to create this ?',
		choices: [ 'module', 'global' ]
	}).run();

	return option;
}

async function propmtModuleQuestion() {
	const moduleName = await new Select({
		name: 'option',
		message: 'Please select the module you want to create for?',
		choices: await generateFolderNames()
	}).run();

	return moduleName;
}

async function promptGlobalServiceQuestion() {
	const answer = await new List({
		name: 'service',
		message: 'Enter the service you want to create(comma seperated)'
	}).run();

	return answer;
}

module.exports = { promptGlobalServiceQuestion, promptOptionQuestion, propmtModuleQuestion };
