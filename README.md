# :zap: PERN Full Stack Baseline

* PostgreSQL Express React Node (PERN) full-stack app, integrates React frontend with Node.js backend.

*** Note: to open web links in a new window use: _ctrl+click on link_**

## :page_facing_up: Table of contents

* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Features](#features)
* [Status](#status)
* [Inspiration](#inspiration)

## :books: General info

### Common for Backend and Frontend

* ESLint with AirBnB rules for following code conventions
* Jest for unit testing
* All communication via RESTful APIs

### Backend

* PostgreSQL needs to be installed and running
* Sequelize as both ORM and DB management (migrations / seed data)
* Postman used to test the backend before frontend was available
* General CORS, JSON WebToken, Dotenv for storing environment variables / credentials (in gitignore)

#### Commands

* Install dependencies: `npm install`
* Linting with ESLint: `npm run lint`
* Attempt to fix lint errors: `npm run lint:fix`
* Reset DB before running tests: `npm run pretest`
* Unit tests with Jest: `npm run test`
* Start node server: `npm run start`
* Sequelize commands: `npx sequelize-cli ...` e.g. `db:migrate:status`, `db:migrate`, `db:migrate:undo`, `db:seed`

### Frontend

* React frontend includes a simple todo list with a user input field and a table of todos below. User can edit and delete todos.
* [JavaScript XML (JSX)](https://reactjs.org/docs/introducing-jsx.html) used to write HTML elements in Javascript
* [React Fragments](https://reactjs.org/docs/fragments.html) used to show table of todos as a row with columns in the DDM

#### Commands

* Install dependencies: `npm install`
* Linting with ESLint: `npm run lint`
* Attempt to fix lint errors: `npm run lint:fix`
* Unit tests with Jest and React tests: `npm run test`
* Start React app in dev mode: `npm run start`

## :signal_strength: Technologies - Backend

* [PostgreSQL v12 / 13](https://www.postgresql.org/)
* [Express.js middleware v4](https://expressjs.com/)
* [Node.js v12 / 14 or higher](https://nodejs.org/es/)
* [Nodemon](https://www.npmjs.com/package/nodemon) npm module so backend server will automatically restart after code changes
* [Postman API](https://www.postman.com/downloads/) to simulate a frontend

## :signal_strength: Technologies - Frontend

* [React framework v16](https://reactjs.org/)
* [Bootstrap v4](https://getbootstrap.com/) component library

## :floppy_disk: Setup - Backend

* Change to `/server` directory
* Install dependencies using `npm i`
* Install [nodemon](https://www.npmjs.com/package/nodemon) globally if you don't already have it
* Install [PostgreSQL](https://www.postgresql.org/) & run it (requires the password you created during installation)
* Add database access credentials to `config/config.js` - recommend installing [npm dotenv](https://www.npmjs.com/package/dotenv) & using .env to hide credentials if commiting to Github
* Postgresql shell commands: `\l` list all databases. `\c` database1 connect to database1. `\dt` inspect tables. `\d+` inspect table & show relation information. `\q` to quit.
* Run `nodemon server` for a dev server
* `http://localhost:5000/` can be accessed for CRUD operations such as POST, GET, PUT, DELETE etc. using Postman

## :floppy_disk: Setup - Frontend

* Change to `/client` directory
* Install dependencies using `npm i`.
* run `npm start`. Frontend will open at `http://localhost:3000/`

## :computer: Code Examples - Backend

* backend `index.js`: express post method used to add new todo [description] to postgreSQL database using SQL INSERT INTO statement

```javascript
// create a todo, using authorize middleware
router.post('/todos', authorize, async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await todo.create({ description, done: false, user_id: req.user.id });
    res.json(newTodo);
  } catch (err) {
    console.error(err.message);
  }
});
```

## :computer: Code Examples - Frontend

* function that runs when user presses 'Add' button: the input body (description) is converted from a JavaScript object to a JSON string & POSTed to the todo database

```javascript
  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });

      console.log("Successfully added todo: ", response);
      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
```

## :cool: Features - Backend

* All data stored in PostgreSQL database that can also be viewed and changed from the PostgreSQL shell (psql)

## :cool: Features - Frontend

* React app created from the command prompt using [Create React App](https://reactjs.org/docs/create-a-new-react-app.html)
* Uses the [Bootstrap basic table](https://www.w3schools.com/bootstrap/bootstrap_tables.asp) to list todos
* [Bootstrap 4 Modal](https://www.w3schools.com/bootstrap4/bootstrap_modal.asp) dialog box

## :clap: :wrench: Inspiration/General Tools

* [PERN Stack Course - PostgreSQL, Express, React and Node](https://www.youtube.com/watch?v=ldYcgPKEZC8&t=116s)
* [Youtube video: Learn Database Design by combining our JWT and PERN stack Todo List app together Part 1](https://www.youtube.com/watch?v=l3njf_tU8us)
* [Youtube video: Learn Database Design by combining our JWT and PERN stack Todo List app together, part 2](https://www.youtube.com/watch?v=25kouonvUbg)
* [Youtube video: How to Deploy a PERN application on Heroku](https://www.youtube.com/watch?v=ZJxUOOND5_A)
* [React documentation](https://reactjs.org/docs/getting-started.html)
* [Enable Emmet support for JSX in Visual Studio Code | React](https://medium.com/@eshwaren/enable-emmet-support-for-jsx-in-visual-studio-code-react-f1f5dfe8809c)
* [js-beautify for VS Code](https://marketplace.visualstudio.com/items?itemName=HookyQR.beautify)

## VSCode Remote Development

The repository now includes .devcontainer and files to allow developers to work in a Dockerized container which
is generated from the same Dockerfile as production, so the development environment stays as close as possible to 
production while the developers need to install minimal software on their system.

### Requirements

- Visual Studio Code by Microsoft https://code.visualstudio.com/
- Remote Development Extension Pack https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack
- Mac / Windows Docker Desktop https://www.docker.com/products/docker-desktop
- Linux Docker Engine https://hub.docker.com/search?offering=community&operating_system=linux&q=&type=edition

### First Time Setup

For some reason the DB init script is not working properly in this environment. Hence, need to initialize PostgreSQL Databases manually.

```
Install PostgreSQL Client
$ apt-get update
$ apt-get install postgresql-client
$ psql -h localhost -U postgresql

postgres=# CREATE DATABASE phantom_development;
postgres=# GRANT ALL PRIVILEGES ON DATABASE phantom_development TO postgres;

postgres=# CREATE DATABASE phantom_test;
postgres=# GRANT ALL PRIVILEGES ON DATABASE phantom_test TO postgres;
```

### Included Extensions

	"extensions": [
		"esbenp.prettier-vscode", // pretty code formatting
		"aaron-bond.better-comments", // Highlights TODO, FIXME, etc.
		"mikestead.dotenv", // .env config support
		"dbaeumer.vscode-eslint", // ESLint integration
		"knisterpeter.vscode-github", // GitHub integration
		"donjayamanne.githistory", // Shows who and when committed specific pieces of code
		"mtxr.sqltools", // Visual SQL tool
		"mtxr.sqltools-driver-pg", // Driver for PgSQL for above tool
		// "eridem.vscode-postman", // To execute newman tests to check if all APIs are functioning correctly
		"coenraads.bracket-pair-colorizer-2", // bracket pair highlights
		"bpruitt-goddard.mermaid-markdown-syntax-highlighting", // Mermaid syntax support
		"hbenl.vscode-test-explorer", // Test explorer for Jest and RSpec
		"kavod-io.vscode-jest-test-adapter", // Jest support for the test explorer
		"ms-vsliveshare.vsliveshare-pack" // For teams having team members working remotely
	],
