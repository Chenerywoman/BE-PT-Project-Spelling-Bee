const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const YearSchema = new Schema({

    year: {
    type: Number, 
    required: true,
    unique: true, 
    }

});

module.exports = mongoose.model('years', YearSchema);
