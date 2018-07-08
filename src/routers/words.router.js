const express = require('express');
const router = express.Router();

const {getWords, getSuffixes, getPrefixes, getMedials, getHomophones, getFree, getMixed} = require('../controllers/words.controller');

router.get('/', getWords);

// router.get('/suffixes/:suffix', getSuffixes);

// router.get('/prefixes/:prefix', getPrefixes);

// router.get('./medials/:medial', getMedials);

// router.get('./homophones/:homophone', getHomophones);

// router.get('./mixed', getMixed);

// router.get('/free', getFree)

module.exports = router;