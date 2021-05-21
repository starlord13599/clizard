const { List, Select } = require('enquirer');
const { generateFolderNames } = require('./generateFolderName');

async function propmtPathQuestion() {
	const list = await new List({
		name: 'path',
		message: 'Type the path where you want to create this file (Comma separated)'
	}).run();

	return list;
}

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

async function promptFunctionNameQuestion() {
	const list = await new List({
		name: 'path',
		message: 'Type the function name(s) you want to create (Comma separated)'
	}).run();

	return list;
}

module.exports = { propmtPathQuestion, propmtModuleQuestion, promptOptionQuestion, promptFunctionNameQuestion };
