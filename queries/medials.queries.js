const Word = require('../models/words.model');

exports.findMedials = (medial) => Word.find({'categories.medials': medial}).select('-__v').lean();
