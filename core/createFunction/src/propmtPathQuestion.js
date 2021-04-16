const { List } = require('enquirer');

async function propmtPathQuestion() {
	const list = await new List({
		name: 'path',
		message: 'Type the path where you want to create this file (Comma separated)'
	}).run();

	return list;
}

module.exports = { propmtPathQuestion };
