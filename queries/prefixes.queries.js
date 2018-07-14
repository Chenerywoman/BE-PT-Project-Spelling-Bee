const Word = require('../models/words.model');

exports.findPrefixes = (prefixId) => Word.find({partials: prefixId}).select('-__v').populate({path: 'partials', select: 'letters', populate:{path: 'categories', select: 'name'}}).populate({path: 'years', select: 'year'}).lean();




