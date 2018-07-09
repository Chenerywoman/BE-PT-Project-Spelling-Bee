const express = require('express');
const router = express.Router();

const {getWords, getPrefixes, getSuffixes, getMedials, getHomophones, getFree, getMixed} = require('../controllers/words.controller');

router.get('/', getWords);

router.get('/prefixes', getPrefixes);

router.get('/suffixes', getSuffixes);

router.get('/medials', getMedials);

router.get('/homophones', getHomophones);

// router.get('/mixed', getMixed);

// router.get('/free', getFree)

module.exports = router;
