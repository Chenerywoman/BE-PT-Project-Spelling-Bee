const mongoose = require('mongoose');
const Word = require('../src/models/words');

exports.seed = (wordsData) => {

    return mongoose.connection.dropDatabase()
        .then(() => Word.insertMany(wordsData));
};
