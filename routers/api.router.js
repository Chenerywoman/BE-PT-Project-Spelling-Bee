const express = require('express');
const router = express.Router();
const wordsRouter = require('./words.router');
const prefixesRouter = require('./prefixes.router');
const suffixesRouter = require('./suffixes.router');
const medialsRouter = require('./medials.router');
const path = require('path');

router.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '..', 'public/index.html')));

router.use('/words', wordsRouter);

router.use('/prefixes', prefixesRouter);

router.use('/suffixes', suffixesRouter);

router.use('/medials', medialsRouter);

module.exports = router;
