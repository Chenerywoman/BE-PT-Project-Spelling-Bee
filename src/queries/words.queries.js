const Word = require('../models/words');

// findMedials, findHomophones, findFree, findMixed

exports.findAllWords = () => Word.find().lean();

exports.findPrefixes = (prefix) => Word.find({'categories.prefixes': prefix}).lean();

exports.findSuffixes = (suffix) => Word.find({'categories.suffixes': suffix}).lean();
