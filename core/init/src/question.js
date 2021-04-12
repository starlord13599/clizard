const { prompt } = require('enquirer');

//prompts user with questions
async function propmtQuestions() {
	const data = await prompt([
		{
			type: 'input',
			name: 'environment',
			message: 'Do you want to run in development or production environment?'
		},
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

module.exports = { propmtQuestions };
