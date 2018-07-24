# Spelling Bee BackEnd

https://mighty-hollows-41094.herokuapp.com/api

Spelling Bee BackEnd is a javascript project which uses data from the UK Education department national curriculum. Briefly, the data includes list of words which children in years 3 & 4 (Key Stage 2) are expected to learn to spell.  It is a RESTful express API which responds to different HTTP requests to various /api endpoints with (arrays of) JSON objects containing school years, categories, and words. It uses the Express npm package in the Node environment to run a server which connects to a MongoDB database using the Mongoose library.  The database connected to is either new_spelling_bee or new_spelling_bee_test, depending on whether the project is running in the test or dev environment.  

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

1.  Node 

2.  NPM (Node Package Manager)

3.  MongoDB 

4.  Mongoose

### Installing

Below is a step by step guide on how to get the server running in a development environment.

#### 1. Download the project from Github
1. On the command line, from the folder where you wish to store the repository, enter:

```bash
git clone https://github.com/Chenerywoman/BE-PT-Project-Spelling-Bee
```

2. Fork the project from Github by clicking on the Fork button on the top right-hand side of the screen.

#### 2. Install node 

1. To check if you already have node installed, run this command in your terminal:

```bash 
node -v
```

2. If node is not installed, follow the instructions at https://nodejs.org/en/

#### 3. Use NPM

1. Npm is distributed with Node.js- which means that when you download Node.js, you automatically get npm installed on your computer.

2. To confirm you have npm installed, run the following command in your terminal:

```bash 
npm -v
```

#### 4. Install MongoDB

1. Follow the instructions to install MongoDB https://docs.mongodb.com/manual/installation/

#### 5. Run NPM install

1. To install all the necessary npm packages (including Mongoose) to run the project, run this command in your terminal from the root of your project:

```bash 
npm install
```

#### 6. Set up a config folder

1. Set up a config folder in the root of the project

```bash 
mkdir config
```

2. Make 3 files in the config folder: dev.js, test.js & index.js. Index.js refers to one of the other 2 files, depending on whether process.env.NODE_ENV is set to 'test' or 'dev'.

```bash 
touch dev.js
``` 

3. Add the following code to each of the files:

**index.js**
```js
module.exports = require(`./${process.env.NODE_ENV}.js`);
```

**test.js**
```js
module.exports = 'mongodb://localhost:27017/new_spelling_bee_test';
```

**dev.js**
```js
module.exports = 'mongodb://localhost:27017/new_spelling_bee';
```

#### 7. Use NPM scripts to run the project

The following scripts (from the package.json scripts section) can be used in the command line to run the project:

  * To seed the dev version of the database: 
  ```bash 
  npm run seedDev
  ```

  * To run the server: 
  ```bash
  npm run dev
  ```

Once the database has been seeded and the server is up and running, it should respond to each of the endpoints listed at /api.

## Running the tests

The test file for the project is ./spec/main.spec.js

To seed the test database & run the tests 
```bash 
npm test
```

#### Break down into end to end tests

The tests use mocha, chai & supertest.  

The main.spec.js has one main 'API endpoints' describe block which contains 4 further describe blocks for each of years, categories, words, prefixes, suffixes, medials & freestyle.  It tests all the endpoints for their respective GET, PUT, POST & DELETE requests.  It also tests error-handling for each route.

## Built With
Node: version 9.9.0
MongoDB: version 3.4.10
NPM: 5.6.0

## Authors
Rachel Chenery 
@Chenerywoman

## Acknowledgments
Massive thanks to my tutors @northcoders, Jac Darby @JacDarby and Anat Dean @AnatDean.