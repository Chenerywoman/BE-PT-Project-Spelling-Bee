const Word = require('../models/words');

// findMixed

exports.findAllWords = () => Word.find().lean();

exports.findPrefixes = (prefix) => Word.find({'categories.prefixes': prefix}).lean();

exports.findSuffixes = (suffix) => Word.find({'categories.suffixes': suffix}).lean();

exports.findMedials = (medial) => Word.find({'categories.medials': medial}).lean();

exports.findHomophones = (homophone) => Word.find({'categories.homophones': homophone}).lean();

exports.findFree = () => Word.find({$and:[ {'categories.prefixes': {$size: 0}}, {'categories.suffixes': {$size: 0}}, {'categories.medials': {$size: 0}}, {'categories.homophones': {$size: 0}}]}).lean();
