const { list, walk } = require('../helpers/fsm/files');
const _ = require('lodash');
setup.moduleFunctions = {};

async function walkModuleFunctions() {
	const folderNames = await list('./api');

	let fileLists = [];
	for (const folder of folderNames) {
		const filesPath = await walk(`${folder}/functions`);
		fileLists = [ ...fileLists, ...filesPath ];
	}

	for (const path of fileLists) {
		let splitedPath = path.split('\\');
		let splitedPathIdx = splitedPath.indexOf('functions') - 1;
		let slicedArray = splitedPath.slice(splitedPathIdx);

		let filterArr = slicedArray.map((arr) => {
			let splitarr = arr.split('.');
			if (splitarr.indexOf('js') !== undefined) {
				return splitarr[0];
			}
			return splitarr;
		});
		const nested = filterArr.reduceRight((all, item) => ({ [item]: all }), require(path));
		_.merge(setup.moduleFunctions, nested);
	}

	// const result = [ 'product', 'model', 'version' ].reduceRight((all, item) => ({ [item]: all }), {});
	return true;
}

// walkModuleFunctions()
// 	.then((result) => {
// 		console.log(setup.moduleFunctions);
// 	})
// 	.catch((err) => {});

module.exports = walkModuleFunctions;
