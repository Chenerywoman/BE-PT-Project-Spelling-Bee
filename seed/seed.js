const mongoose = require('mongoose');
const Word = require('../src/models/words.model');
const Category = require('../src/models/categories.model');

exports.seed = (wordsData, categoriesData) => {

    return mongoose.connection.dropDatabase()
        .then(() => Promise.all([Word.insertMany(wordsData), Category.insertMany(categoriesData)]));
};
