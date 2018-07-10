const express = require('express');
const router = express.Router();
const {getWords, getFree, postNewWord, deleteWord} = require('../controllers/words.controller');

router.route('/')
.get(getWords)
.post(postNewWord);
// .delete(deleteWord);

router.get('/freestyle', getFree);

module.exports = router;
