const dotenv = require('dotenv');
dotenv.config();
global.setup = {};
const express = require('express');
const app = express();
const chalk = require('chalk');
const ejsLayout = require('express-ejs-layouts');
const morgan = require('morgan');
const { checkPendingMigrations } = require('./helpers/migrations');
const { findFreePort } = require('./helpers/port');
const { Toggle } = require('enquirer');
const { initializeDatabseConnection } = require('./core/connection');
const { getAllRoutes } = require('./core/routes.js');
require('./core/functions')();
require('./core/services')();
require('./core/moduleFunctions')();
require('./core/moduleServices')();

//STATIC
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));

//MIDDLEWARE
app.use(morgan(':remote-addr| :method| :total-time[2] ms| :status| :date[web]'));
app.use(ejsLayout);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//TEMPLATE ENGINE
app.set('view engine', 'ejs');
app.set('layout', './layouts/oneColumn.ejs');

//ROUTES
getAllRoutes()
	.then((routes) => {
		for (const route of routes) {
			app[route.method](route.url, ...route.middlewares, route.controller);
		}
	})
	.catch((err) => {
		console.log(err);
	});

//INITIALIZE SERVER
checkPendingMigrations()
	.then((migrations) => {
		if (Array.isArray(migrations)) {
			migrations.map((migration) => console.log(`Migrations done --> ${migration.file}`));
		}

		findFreePort()
			.then(async (freePort) => {
				let answer = true;
				if (!(freePort === 3000)) {
					answer = await new Toggle({
						message: `Available port is ${freePort}, Do you want to run?`,
						enabled: 'Yes',
						disabled: 'No'
					}).run();
				}

				if (!answer) {
					throw new Error('Cannot start the server');
				}
				initializeDatabseConnection()
					.then((result) => {
						console.log(result);
						app.listen(freePort, () => console.log(`Running server on ${freePort}`));
					})
					.catch((err) => {});
			})
			.catch((err) => {
				console.log(chalk.red(err));
			});
	})
	.catch((err) => {
		console.log(chalk.red(err));
		process.exit();
	});
