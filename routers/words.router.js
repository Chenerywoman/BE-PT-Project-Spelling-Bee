const express = require('express');
const router = express.Router();
const {getWords, postNewWord, removeWord} = require('../controllers/words.controller');

router.route('/')
.get(getWords)
.post(postNewWord)
.delete(removeWord);

module.exports = router;
