const { List } = require('enquirer');
const { Select } = require('enquirer');
const { generateFolderNames } = require('./generateFolderName');

async function askMiddleware() {
	const question = await new List({
		name: 'gMiddlewares',
		message: 'Type the global middleware you want to create file (Comma separated)'
	}).run();

	return question;
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

async function askEndpoint(endpoints = []) {
	const endpoint = await new Select({
		name: 'endpoint',
		message: 'Please select the an endpoint you want to create for?',
		choices: endpoints
	}).run();

	return endpoint;
}

module.exports = { askMiddleware, promptOptionQuestion, propmtModuleQuestion, askEndpoint };
