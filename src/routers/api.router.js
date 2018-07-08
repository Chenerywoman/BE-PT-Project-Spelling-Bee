const express = require('express');
const router = express.Router();
const wordsRouter = require('./words.router');
const path = require('path');

router.get('/', (req, res, next) => res.sendFile(path.join(__dirname, '..', '..', 'public/index.html')));

router.use('/words', wordsRouter);

module.exports = router;
