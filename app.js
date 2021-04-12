#!/usr/bin/env node

const { program } = require('commander');
const packageConfig = require('./package.json');
const { green, red } = require('chalk');
const { init } = require('./core/init/init');
const { createApiModule } = require('./core/createModule/createApiModule');
const { createApi } = require('./core/createApi/createApi');

program.version(packageConfig.version).description(packageConfig.description);

//clizard init
program.command('init').description('To initialize the basic setup').action(() => {
	init()
		.then((result) => {
			if (result) {
				console.log(green('Setup is ready'));
			}
		})
		.catch((err) => {
			console.log(red(err));
		});
});

//clizard create-api-module
program.command('create-api-module <moduleName>').description('to create a api module').action((moduleName) => {
	createApiModule(moduleName)
		.then((result) => {
			if (result) console.log('Command ran successfully');
		})
		.catch((err) => {
			console.log(err);
		});
});

// clizard create-api
program.command('create-api').description('to create an api endpoint').action(() => {
	createApi()
		.then((result) => {
			console.log('Created successfully');
		})
		.catch((err) => {
			console.log(err);
		});
});

program.parse(process.argv);
