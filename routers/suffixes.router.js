const express = require('express');
const router = express.Router();
const {getSuffixes} = require('../controllers/suffixes.controller');

router.get('/', getSuffixes);

module.exports = router;
