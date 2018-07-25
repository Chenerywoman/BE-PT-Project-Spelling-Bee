const Word = require('../models/words.model');

exports.findHomophones = (homophone) => Word.find({'categories.homophones': homophone}).select('-__v').lean();
