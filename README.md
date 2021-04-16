# Clizard 🧞‍♂️ #

It is a small module which create a basic setup of files and folders which are somewhat comman in all projects. It does the below shown activities

* creates the following folder
    -  _api ,controller ,middleware ,helper ,core ,functions , cron , routes ,public ,views._
* creates following files
    -  _.sequelize ,app.js ,.env_
* Automatically installs following dependencies
    -  _express ,ejs ,express-ejs-layouts,sequelize_

## Available Commands ##
- - - -
`npx clizard init`

`npm clizard create-api-module <moduleName>`

`npx clizard  create-api`

## What it does? ##
- - - -
## 1.) init ##

As soon as the user runs this command he/she will b prompted with the following questions

1. In which environment you want to run this setup, production or development
2. Please enter the database username.
3. Please enter the database password.
4. Please enter the database name.

It will create all the folders with the following names mentioned above

It will also create all the files mentioned above

Then it will install all the packages mentioned above

Then it will run the following commnads provided by sequelize

```
npx sequelize init:config
npx sequelize init:migrations
npx sequelize init:seeders
npx sequelize init:model
```

And finally it will update the database.json file (which was created by ` sequelize init:config ` ) with the values which entered by the user during the prompt

---
## 2.) create-api-module _moduleName_ ##

`Example:- npx clizard create-api-module blog`

The command will automatically create 3 folders called controller,service,middleware each containing file named with _moduleName_.js

```
api
 |-controller
 |  |-blog.js
 |-middleware
 |  |-blog.js
 |-services
 |  |-blog.js
 |-routes.json
```
As soon as the we run this command it will prompt with the question

_Where do you want to create this module(default:api)?_


if the user enters a value then it will automatically create a new directory on root with the above following folders and file

---
## 3.) create-api ##
on running this command it will walk through all the folder in api directory and  ask the user for which directory does he want to create middleware and controller and at what endpoint


following below are the questions that will prompt

1.)Pick a module(it will be dynamic based on the modules create by users in api directory) _blog_

2.)Pick a method _[get|post|put|patch|delete]_

3.)Enter name of your Action name? _getPosts_

4.)Enter the middleware you want to create(comma seperated)? _foo,bar_

5.)Enter the global middleware you want to create(comma seperated)? _ifany_

6.)Enter name the endpoint name? _/users_

7.)Do you want the path from root? _No/Yes_


according to the question asnwered it will update in routes.json with following details

```json
[
  {
    "method": "get",
    "url": "/users",
    "globalMiddlewares": [],
    "middlewares": [
      "blog.foo",
      "blog.bar"
    ],
    "controller": "blog.getPosts",
    "pathFromRoot": true,
    "middlewarePath": "../api/blog/middleware/blog.js",
    "controllerPath": "../api/blog/controller/blog.js"
  }
]
```

also will create below boilerplate in controller/blog.js and middleware/blog.js

`controller/blog.js`
```javascript
module.exports = {
	test: function(req, res, next) {
		//code goes here
		next();
	},
	getPosts: function(req, res, next) {
        //code goes here
		res.status(200).json({ status: 1, message: 'Success' });
		next();
	}
};

```

`middleware/blog.js`
```javascript
module.exports = {
	test: function(req, res, next) {
		//code goes here
		next();
	},
	bar: function(req, res, next) {
		//code goes here
		console.log("in blogs's bar");
		next();
	},
	foo: function(req, res, next) {
		//code goes here
		console.log("in blogs's foo");

		next();
	}
};

```
_to explain the perfect flow of this setup will soon add a link to that repo_

___NOTE :-___ _This setup is just merely made for practise purpose of the user who created it. Please do use it at your own risk. Contents may vary_