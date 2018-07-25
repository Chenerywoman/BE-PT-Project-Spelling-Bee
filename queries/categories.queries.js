const Category = require('../models/categories.model');

exports.findAllCategories = () => Category.find().select('-__v').populate({path: 'years', select: 'year'}).lean();

exports.findCategoriesByYear = (yearId) => Category.find({years: yearId}).select('-__v').populate({path: 'years', select: 'year'}).lean();

exports.findCategory = (category) => Category.find({name: category}).populate({path: 'years', select: 'year'}).select('-__v').lean();
