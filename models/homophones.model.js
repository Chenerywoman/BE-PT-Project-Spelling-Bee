const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomophoneSchema  = new Schema({

word: {
    type: String, 
    required: true, 
    unique: true,
    lowercase: true
},

category: {
type: [Schema.Types.ObjectId],
ref: 'categories',
required: true
},

year: {
    type: Schema.Types.ObjectId,
    ref: 'years',
    required: true
},

homophones: {
    type: [Schema.Types.ObjectId],
    ref: 'words', 
    required: true
}

});

module.exports = mongoose.model('homophones', HomophoneSchema);
