const Word = require('../models/words.model');

// this query just returns selected fields in populate
exports.findAllWords = () => Word.find().select('-__v').populate({path: 'partials', select: 'letters', populate:{path: 'categories', select: 'name'}}).populate({path:'years', select: 'year'}).lean();

// this query returns all fields in the populated collections
// exports.findAllWords = () => Word.find().select('-__v').populate({path: 'partials', populate:{path: 'categories'}}).populate({path:'years', select: 'year'}).lean();

exports.findFree = () => Word.find({partials: []}).select('-__v').populate({path: 'years', select: 'year'}).lean();

exports.checkforWord = (word) => Word.find({word});
 
exports.createWord = (word, partials, years) => Word.create({word, years, partials});
 
exports.deleteWord = (word) => Word.deleteOne({word}).lean();
