const express = require('express');
const router = express.Router();
const yearsRouter = require('./years.router');
const categoriesRouter = require('./categories.router');
const wordsRouter = require('./words.router');
const prefixesRouter = require('./prefixes.router');
const suffixesRouter = require('./suffixes.router');
const medialsRouter = require('./medials.router');
const homophonesRouter = require('./homophones.router');
const freestyleRouter  = require('./freestyle.router');
const path = require('path');

router.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '..', 'public/index.html')));

router.use('/years', yearsRouter);

router.use('/categories', categoriesRouter);

router.use('/words', wordsRouter);

router.use('/prefixes', prefixesRouter);

router.use('/suffixes', suffixesRouter);

router.use('/medials', medialsRouter);

router.use('/homophones', homophonesRouter);

router.use('/freestyle', freestyleRouter);

module.exports = router;
