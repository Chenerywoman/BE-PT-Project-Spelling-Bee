/* eslint-disable no-console */

const {years, categories, prefixes, suffixes, medials, words } = require('./data/devData/index');
const mongoose = require('mongoose');
const url = require('../config');
const {seed} = require('./seed');

mongoose.connect(url, { useNewUrlParser: true })
.then(() => seed(years, categories, prefixes, suffixes, medials, words))
.then((() => {
    mongoose.disconnect();
    console.log('newDev database seeded');
}))
.catch(err => console.log('err in devSeed', err));
