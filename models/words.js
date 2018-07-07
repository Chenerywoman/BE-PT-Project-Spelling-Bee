const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({

word: {
type: String, 
unique: true, 
lowercase: true,
required: true

},

rules: {
suffix: [String], 
prefix: [String],
median: [String],
homophones:[String]
}
})

module.exports = mongoose.model('words', WordSchema)