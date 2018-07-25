const express = require('express');
const router = express.Router();
const {getFree} = require('../controllers/words.controller');

router.get('/', getFree);

module.exports = router;
