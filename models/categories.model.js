const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategoriesSchema = new Schema ({

category: {
type: String,
unique: true, 
lowercase: true, 
required: true
},

description: {
type: String
},

words: {
type: [String]
}
});

module.exports = mongoose.model('categories', CategoriesSchema);
