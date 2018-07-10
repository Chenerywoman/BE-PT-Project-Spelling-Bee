const mongoose = require('mongoose');
const Word = require('../models/words.model');
const Category = require('../models/categories.model');

exports.seed = (wordsData, categoriesData) => {

    return mongoose.connection.dropDatabase()
        .then(() => Promise.all([Word.insertMany(wordsData), Category.insertMany(categoriesData)]));
};
