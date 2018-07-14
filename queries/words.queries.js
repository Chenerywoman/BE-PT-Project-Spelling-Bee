const Word = require('../models/words.model');
const Category = require('../models/categories.model');

exports.findAllWords = () => Word.find().select('-__v').populate({path: 'partials', populate:{path: 'categories', select: {'name':1}}}).lean().then(async words => {
    const finalResult = await Promise.all(words.map(async word => { 
        const partials = await Promise.all(word.partials.map( async partial => {
            const category = await Promise.all(partial.category.map(category => {
                    return Category.findById(category._id)
            }))
            return {...partial, category}
        }))
        return {...word, partials}
}));
// console.log(JSON.stringify(finalResult[4], null, 2))
return finalResult
})

exports.findFree = () => Word.find({partials: []}).select('-__v').lean();

exports.checkforWord = (word) => Word.find({word});
 
exports.createWord = (word, partials, years) => Word.create({word, years, partials});
 
exports.deleteWord = (word) => Word.deleteOne({word}).lean();
