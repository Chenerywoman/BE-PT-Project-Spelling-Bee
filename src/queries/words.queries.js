const Word = require('../models/words');

// findSuffixes, findPrefixes, findMedials, findHomophones, findFree, findMixed

exports.findAllWords = () => Word.find().lean();

