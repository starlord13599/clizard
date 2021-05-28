#!/usr/bin/env node
const { program } = require('commander');
const packageConfig = require('./package.json');
const { green, red } = require('chalk');
const { init } = require('./core/init/init');
const { createApiModule } = require('./core/createModule/createApiModule');
const { createApi } = require('./core/createApi/createApi');
const { createFunction } = require('./core/createFunction/createFunctions');
const ora = require('ora');
const { createMiddleware } = require('./core/createMiddleware/createMiddleware');
const { createService } = require('./core/createService/createService');

program.version(packageConfig.version).description(packageConfig.description);

//clizard init
program
	.command('init')
	.description('To initialize the basic setup')
	.action(() => {
		init()
			.then((result) => {
				if (result) {
					global.isConfigured = false;
					console.log(green('Setup is ready'));
				}
			})
			.catch((err) => {
				console.log(red(err));
			});
	});

//clizard create-api-module
program
	.command('create-api-module <moduleName>')
	.description('to create a api module')
	.action((moduleName) => {
		createApiModule(moduleName)
			.then((result) => {
				if (result) ora('Command ran successfully').succeed();
			})
			.catch((err) => {
				console.log(err.message);
			});
	});

// clizard create-api
program
	.command('create-api')
	.description('to create an api endpoint')
	.action(() => {
		createApi()
			.then((result) => {
				ora('Created successfully').succeed();
			})
			.catch((err) => {
				console.log(err.message);
			});
	});

//to create functions
program
	.command('create-function')
	.description('to create a function which will be stored in global variable')
	.action(() => {
		createFunction()
			.then((result) => {
				console.log('Command ran successfully');
			})
			.catch((err) => {
				console.log(err);
			});
	});

//to create global middleware
program
	.command('create-middleware')
	.description('To create a global middleware boilerplate')
	.action(() => {
		createMiddleware()
			.then((result) => {
				console.log('Command ran successfully');
			})
			.catch((err) => {
				console.log(err);
			});
	});

//to create a global service
program
	.command('create-service')
	.description('To create a global service boilerplate')
	.action(() => {
		createService()
			.then((result) => {
				console.log('Command ran successfully');
			})
			.catch((err) => {
				console.log(err);
			});
	});

program.parse(process.argv);
