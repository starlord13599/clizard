const { list, name } = require('../../../fsm/files');

//function to return all folders present in api folder
async function generateFolderNames() {
	try {
		const folders = await list('api');
		if (folders.length === 0) {
			throw new Error('No module found');
		}
		const folderName = folders.map(async (folder) => await name(folder));
		return folderName;
	} catch (error) {
		throw error;
	}
}
module.exports = { generateFolderNames };
