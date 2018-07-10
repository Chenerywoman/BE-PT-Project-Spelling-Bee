const express = require('express');
const router = express.Router();
const {getMedials} = require('../controllers/medials.controller');

router.get('/', getMedials);

module.exports = router;
