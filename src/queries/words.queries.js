const Word = require('../models/words');

// findHomophones, findFree, findMixed

exports.findAllWords = () => Word.find().lean();

exports.findPrefixes = (prefix) => Word.find({'categories.prefixes': prefix}).lean();

exports.findSuffixes = (suffix) => Word.find({'categories.suffixes': suffix}).lean();

exports.findMedials = (medial) => Word.find({'categories.medials': medial}).lean();

exports.findHomophones = (homophone) => Word.find({'categories.homophones': homophone}).lean();
