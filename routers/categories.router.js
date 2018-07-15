const express = require('express');
const router = express.Router();
const {getCategories, getCategory} = require('../controllers/categories.controller');

router.get('/', getCategories);

router.get('/:category', getCategory);

module.exports = router;
