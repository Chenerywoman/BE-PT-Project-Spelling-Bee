const Word = require('../models/words');

// findSuffixes findMedials, findHomophones, findFree, findMixed

exports.findAllWords = () => Word.find().lean();

exports.findPrefixes = (prefix) => Word.find({'categories.prefixes': `${prefix}`}).lean();
