process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();
let url = process.env.NODE_ENV === 'production' ? process.env.MONGO_URL : require('./config/index');
const {json} = require('body-parser');
const apiRouter = require('./routers/api.router.js');

mongoose.connect(url, { useNewUrlParser: true });

app.use(json());

app.use(cors());

app.get('/', function(req, res) {
    return res.status(200).send({message: 'please see /api for routes'});
});

app.use(express.static('public'));

app.use('/api', apiRouter);

app.get('/*', (req, res) => res.status(404).send({message: '404 not found'}));

app.use((err, req, res, next) => {
res.status !== 500
? res.status(err.status).send({error: err.message})
: res.status(500).send({error: `server error in ${err.controller}`});
});

module.exports = app;

