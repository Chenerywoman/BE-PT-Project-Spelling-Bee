const Word = require('../models/words');

// findHomophones, findFree, findMixed

exports.findAllWords = () => Word.find().lean();

exports.findPrefixes = (prefix) => Word.find({'categories.prefixes': prefix}).lean();

exports.findSuffixes = (suffix) => Word.find({'categories.suffixes': suffix}).lean();

exports.findMedials = (medial) => {
    console.log('medial', medial)
   return  Word.find({'categories.medials': medial}).lean();
}
