const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({

    name: {
        type: String,
        unique: true,
        lowercase: true,
        required: true
    },
  
    years: [{type: [Schema.Types.ObjectId], ref: 'years', required: true}],
    
    description: String

});

module.exports = mongoose.model('categories', CategoriesSchema);
