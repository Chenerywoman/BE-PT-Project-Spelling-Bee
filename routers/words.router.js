const express = require('express');
const router = express.Router();

const {getWords, getPrefixes, getSuffixes, getMedials, getHomophones, getFree, getMixed, postNewWord} = require('../controllers/words.controller');

router.route('/')
.get(getWords)
.post(postNewWord);

router.get('/prefixes', getPrefixes);

router.get('/suffixes', getSuffixes);

router.get('/medials', getMedials);

router.get('/homophones', getHomophones);

router.get('/freestyle', getFree);

module.exports = router;
