const Word = require('../models/words.model');

exports.findMedials = (medialId) => Word.find({partials: medialId}).select('-__v').populate({path: 'partials', select: 'letters', populate:{path: 'categories', select: 'name'}}).populate({path: 'years', select: 'year'}).lean();
