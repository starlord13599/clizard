const path = require('path');
const { readdir } = require('fs-extra');

//function to return all folders present in api folder
async function generateFolderNames() {
	try {
		const folders = await readdir(path.resolve('api'));
		if (folders.length === 0) {
			throw new Error('No module found');
		}
		return folders;
	} catch (error) {
		throw error;
	}
}

module.exports = { generateFolderNames };
