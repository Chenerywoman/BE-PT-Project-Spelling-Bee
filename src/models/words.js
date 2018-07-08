const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({

word: {
type: String, 
unique: true, 
lowercase: true,
required: true

},

categories: {
suffixes: {type: [String]},
prefixes: {type: [String]},
medials: {type: [String]},
homophones:{type: [String]}
}
});

module.exports = mongoose.model('words', WordSchema);
