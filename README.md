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
`npx clizard clizard-init`

### What it does? ###
- - - -
As soon as the user runs this command he/she will b prompted with the following questions

1. In which environment you want to run this setup, production or development
2. Please enter the database username.
3. Please enter the database password.
4. Please enter the database name.

It will create all the folders with the following names mentioned above

It will also create all the files mentioned above

Then it will install all the packages mentioned above

Then it will run the following commnads provided by sequelize

` npx sequelize init:config `

` npx sequelize init:migrations `

` npx sequelize init:seeders `

` npx sequelize init:model `

And finally it will update the database.json file (which was created by ` sequelize init:config ` ) with the values which entered by the user during the prompt

___NOTE :-___ _This setup is just merely made for practise purpose of the user who created it. Please do use it at your own risk. Contents may vary_