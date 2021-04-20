const { walk } = require('../helpers/fsm/files');
const _ = require('lodash');
setup.functions = {};

async function walkFunctions() {
	const walked = await walk('./functions');

	for (const path of walked) {
		let splitedPath = path.split('\\');
		let splitedPathIdx = splitedPath.indexOf('functions') + 1;
		let slicedArray = splitedPath.slice(splitedPathIdx);

		let filterArr = slicedArray.map((arr) => {
			let splitarr = arr.split('.');
			if (splitarr.indexOf('js') !== undefined) {
				return splitarr[0];
			}
			return splitarr;
		});
		const nested = filterArr.reduceRight((all, item) => ({ [item]: all }), require(path));
		_.merge(setup.functions, nested);
	}

	// const result = [ 'product', 'model', 'version' ].reduceRight((all, item) => ({ [item]: all }), {});
	return true;
}

// walkFunctions()
// 	.then((result) => {
// 		console.log(setup.functions['foo']['bar']['far']['loo']());
// 	})
// 	.catch((err) => {});

module.exports = walkFunctions;
