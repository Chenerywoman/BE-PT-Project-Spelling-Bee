const express = require('express');
const router = express.Router();
const {getPrefixes} = require('../controllers/prefixes.controller.js');

router.get('/', getPrefixes);

module.exports = router;
