const Year = require('../models/years.model');

exports.findAllYears = () => Year.find().select('-__v').lean();

exports.findYears = (years) => {
    return Promise.all (years.map(year => {
       return Year.find({year});
    }))
    .then(years =>  years);
};

exports.findYear = (year) => Year.find({year}).select('-__v').lean();
