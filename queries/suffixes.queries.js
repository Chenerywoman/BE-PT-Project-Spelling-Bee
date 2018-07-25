const Word = require('../models/words.model');

exports.findSuffixes = (suffixId) => Word.find({partials: suffixId}).select('-__v').populate({path: 'partials', select: 'letters', populate:{path: 'categories', select: 'name'}}).populate({path: 'years', select: 'year'}).lean();
