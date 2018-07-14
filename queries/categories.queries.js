const Category = require('../models/categories.model');

exports.findAllCategories = () => Category.find().select('-__v').lean();

exports.findCategory = (category) => Category.find({name: category}).select('-__v').lean();
