const Partial = require('../models/partials.model');

exports.findPostedPartials = (partials) => {
        return Promise.all (partials.map(partial => {
           return Partial.find({partial});
        }));

};

exports.findPartialsByCategory = (categoryId) =>  Partial.find({category: categoryId}).select('-__v').lean();
