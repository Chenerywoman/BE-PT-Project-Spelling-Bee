const mongoose = require('mongoose');
const Word = require('../models/words');

exports.seed = (wordsData) => {

    return mongoose.connection.dropDatabase()
        .then(() => Word.insertMany(wordsData));
};
