const {words, prefixes, suffixes, medials} = require('./data/devData/index');
const dataMaker = require('./dataMaker');
const mongoose = require('mongoose');
const url = require('../config/index');
const {seed} = require('./seed');

const wordData = dataMaker(words, prefixes, suffixes, medials);

mongoose.connect(url, { useNewUrlParser: true })
.then(() => seed(wordData))
.then((() => {
    mongoose.disconnect();
    console.log('dev database seeded');
}))
.catch(err => console.log('err in devSeed', err));
