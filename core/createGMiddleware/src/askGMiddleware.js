const { List } = require('enquirer');

async function askGMiddleware() {
	const question = await new List({
		name: 'gMiddlewares',
		message: 'Type the global middleware you want to create file (Comma separated)'
	}).run();

	return question;
}

module.exports = { askGMiddleware };
