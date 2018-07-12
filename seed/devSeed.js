const {words, prefixes, suffixes, medials, homophones, prefixesDescription, suffixesDescription, medialsDescription, homophonesDescription } = require('./data/devData/index');
const {wordsMaker, categoriesMaker} = require('./dataMakers');
const mongoose = require('mongoose');
const url = require('../config/index');
const {seed} = require('./seed');

const wordData = wordsMaker(words, prefixes, suffixes, medials);
const categoriesData = categoriesMaker(prefixes, suffixes, medials, homophones, prefixesDescription, suffixesDescription, medialsDescription, homophonesDescription);

mongoose.connect(url, { useNewUrlParser: true })
.then(() => seed(wordData, categoriesData))
.then((() => {
    mongoose.disconnect();
    console.log('dev database seeded');
}))
.catch(err => console.log('err in devSeed', err));
