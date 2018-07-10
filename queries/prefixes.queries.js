const Word = require('../models/words.model');

exports.findPrefixes = (prefix) => Word.find({'categories.prefixes': prefix}).select('-__v').lean();
