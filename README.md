# NODEJS MySQL CRUD

 CRUD actions written in NodeJS/ExpressJS and MySQL. 
### DEMO 
Check live demo : 
http://cs9-node-mysql-crud.herokuapp.com/customers

### Prerequisites


1. ExpressJS
2. Knex
3. Bookshelf.js

### Installation

Clone the project using command

```
git clone https://github.com/chetans9/node-mysql-crud.git
```
OR by downloading the zip file.

navigate to the project folder

```
cd <project folder>
```

Install Dependencies

```
npm install
```
##### Migrations :
For migrations to work you need to have knex installed globally. Install using below command
```
npm i knex -g
```
create a new Mysql database and configure database name in config/development.json file  and run :
```
knex migrate:latest
```

Start the server 

```
npm start
```
the server will start listening on port 3000 by default

open url http://localhost:3000







## Built With

* [ExpressJS](https://expressjs.com/) - Framework
* [Knex](https://knexjs.org/) - MySQL 
* [Bookshelf.js](https://bookshelfjs.org/) - ORM

## Screen shot

![Alt text](public/assets/img/node_mysql_crud.png?raw=true "Node mysql crud screen")




