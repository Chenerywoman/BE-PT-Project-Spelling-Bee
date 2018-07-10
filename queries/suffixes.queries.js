const Word = require('../models/words.model');

exports.findSuffixes = (suffix) => Word.find({'categories.suffixes': suffix}).select('-__v').lean();