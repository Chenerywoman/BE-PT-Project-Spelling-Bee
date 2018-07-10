const express = require('express');
const router = express.Router();
const {getHomophones} = require('../controllers/homophones.controller');

router.get('/', getHomophones);

module.exports = router;
