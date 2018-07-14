const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartialSchema = new Schema({

    letters: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },

    categories: [{ type: Schema.Types.ObjectId, ref: 'categories', required: true }],

    years: [{ type: Schema.Types.ObjectId, ref: 'years', required: true }],

    description: String

});

module.exports = mongoose.model('partials', PartialSchema);
