const { List } = require('enquirer');

async function promptGlobalServiceQuestion() {
	const answer = await new List({
		name: 'service',
		message: 'Enter the service you want to create(comma seperated)'
	}).run();

	return answer;
}

module.exports = { promptGlobalServiceQuestion };
