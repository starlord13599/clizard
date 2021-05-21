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

----

## 4.) create-function ##

As soon the user runs this command he/she will be prompted with few questions

1.)At what level does he want to create this function? _[module|global]_

If global...

2.)Enter the path where he wants to create this function(comma seperated)? _from,to,foo_

3.)Enter the name of the function you want to create? _bar_

It will then automatic create a function in root function folder

If module...
2.)Select the module you want to create it for..?_blog_

3.)Enter the path you want to create this function in(comma seperated)? _to,from,boo_

4.)Enter the name of the function you want to create? _moo_

After doing so the function will be created in that specific selected module...

---

## 5.) create-service ##

When run, the user is prompted with the below questions

1.)At what level do you want to create this service _[global|module]_

If global...

2.)Enter the service you want to create(comma seperated) _foo,bar,far_

After entering the name the services will be created automatically in the root service folder

If module...

2.)Select the module you want to create it for..?_blog_

3.)Enter the name of the services you want to create (comma seperated)? _moo,koo_

After entering the names the services will be created in that respective module's service folder

---

## create-middleware ##

When run, the user is prompted with the below questions

1.)At what level do you want to create this service _[global|module]_

If global ...

2.)Enter the name of the global middleware you want to create? _global_

This will then directly create the global middleware in the root middleware folder

If module ...

2.)Select the module you want to create it for..?_blog_

3.)For which url you want to create this middleware for? _/show_

4.)what method do it have? _[get|post]etc_

4.)Enter the name of the middlware you want to create? _foobar_

After this the middleware will be created with the specified name and will also update the routes.js file with the following details

---
_to explain the perfect flow of this setup will soon add a link to that repo_

___NOTE :-___ _This setup is just merely made for practise purpose of the user who created it. Please do use it at your own risk. Contents may vary_

