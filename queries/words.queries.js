const Word = require('../models/words.model');

exports.findAllWords = () => Word.find().select('-__v').lean();

exports.findSuffixes = (suffix) => Word.find({'categories.suffixes': suffix}).select('-__v').lean();

exports.findMedials = (medial) => Word.find({'categories.medials': medial}).select('-__v').lean();

exports.findHomophones = (homophone) => Word.find({'categories.homophones': homophone}).select('-__v').lean();

exports.findFree = () => Word.find({$and:[ {'categories.prefixes': {$size: 0}}, {'categories.suffixes': {$size: 0}}, {'categories.medials': {$size: 0}}, {'categories.homophones': {$size: 0}}]}).select('-__v').lean();

exports.createWord = (word, prefixes, suffixes, medials, homophones) => Word.create({word, categories: {prefixes: prefixes, suffixes: suffixes, medials: medials, homophones :homophones}});

exports.deleteWord = (word) => Word.deleteOne({word}).lean();
