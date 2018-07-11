const express = require('express');
const router = express.Router();
const {getWords, getFree, postNewWord, removeWord} = require('../controllers/words.controller');

router.route('/')
.get(getWords)
.post(postNewWord)
.delete(removeWord);

router.get('/freestyle', getFree);

module.exports = router;
