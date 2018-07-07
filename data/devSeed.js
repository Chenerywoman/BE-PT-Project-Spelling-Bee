const {words, prefixes, suffixes, medial} = require('./devData');
const dataMaker = require('../data/dataMaker');
const mongoose = require('mongoose');
const url = require('../config/index');
const {seed} = require('./seed');

const wordData = dataMaker(words, prefixes, suffixes, medial);
console.log('wordData', wordData)

// see google - need to add an additional argument to connect ({parser: true})
mongoose.connect(url)
.then(() => seed(wordData))
.then((() => {
    mongoose.disconnect();
    console.log('dev database seeded');
}))
.catch(err => console.log('err in devSeed', err));
