const { appendFile } = require('fs').promises;

async function logQuery(mssge) {
	let date = new Date().toJSON();
	const currentdate = date.slice(0, 10);
	const buildPath = `${process.cwd()}/dbLog/${currentdate}.txt`;
	mssge = `${date} --> ${mssge}\n`;
	await appendFile(buildPath, mssge);
}

module.exports = { logQuery };
