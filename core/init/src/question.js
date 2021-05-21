const { prompt, Select } = require('enquirer');

//prompts user with questions
async function propmtQuestions() {
	const data = await prompt([
		{
			type: 'input',
			name: 'username',
			message: 'Please provide databse username'
		},
		{
			type: 'input',
			name: 'password',
			message: 'Please provide databse password '
		},
		{
			type: 'input',
			name: 'database',
			message: 'Please provide databse name '
		}
	]);
	return data;
}

async function promptEnvironmentQuestion() {
	const answer = await new Select({
		message: 'For which environment you want to create this setup?',
		choices: [ 'development', 'production', 'none' ],
		name: 'environment'
	}).run();
	return answer;
}

module.exports = { propmtQuestions, promptEnvironmentQuestion };
