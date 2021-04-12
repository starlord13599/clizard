const { appendFile } = require('fs').promises;

//to append function snippets for middleware
async function updateMiddlewareFile({ middlewares }, functionSnippet, moduleName) {
	if (middlewares.length === 0) {
		return false;
	}

	middlewares.forEach(async (middleware) => {
		const splited = middleware.split('.')[1];
		let updatedSnippet = functionSnippet.replace('test', splited);
		await appendFile(`${process.cwd()}/api/${moduleName}/middleware/test.js`, updatedSnippet);
	});
	return true;
}
//to append function snippets for controller
async function updateControllerFile({ controller }, functionSnippet, moduleName) {
	if (controller === undefined) {
		return false;
	}

	const splited = controller.split('.')[1];
	let updatedSnippet = functionSnippet.replace('test', splited);
	await appendFile(`${process.cwd()}/api/${moduleName}/controller/test.js`, updatedSnippet);

	return true;
}

module.exports = { updateControllerFile, updateMiddlewareFile };
