const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WordSchema = new Schema({

word: {
type: String, 
required: true,
unique: true, 
lowercase: true,
},

// partials: {
// type: [Schema.Types.ObjectId],
// ref: 'partials'
// }
partials: [{ type: Schema.Types.ObjectId, ref: 'partials' }],

years: [{type: [Schema.Types.ObjectId], ref: 'years', required: true}]

});

module.exports = mongoose.model('words', WordSchema);
