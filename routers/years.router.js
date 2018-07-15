const express = require('express');
const router = express.Router();
const {getYears, getYear} = require('../controllers/years.controller');

router.route('/')
.get(getYears)

router.get('/:year', getYear);

module.exports = router;
