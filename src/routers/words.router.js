const express = require('express');
const router = express.Router();

const {getWords, getSuffixes, getPrefixes, getMedials, getHomophones, getFree, getMixed} = require('../controllers/words.controller');

router.get('/', getWords);

router.get('/prefixes', getPrefixes);

router.get('/suffixes', getSuffixes);

// router.get('./medials/:medial', getMedials);

// router.get('./homophones/:homophone', getHomophones);

// router.get('./mixed', getMixed);

// router.get('/free', getFree)

module.exports = router;
