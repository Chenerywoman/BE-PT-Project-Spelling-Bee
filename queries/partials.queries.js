const Partial = require('../models/partials.model');

exports.findPartial = (partial) => Partial.find({letters: partial});

exports.findPostedPartials = (partials) => {
        return Promise.all (partials.map(partial => {
           return Partial.find({partial});
        }));

};

exports.findPartialsByCategory = (categoryId) =>  Partial.find({categories: categoryId}).select('-__v').populate({path: 'categories', select: 'name'}).populate({path: 'years', select: 'year'}).lean();
